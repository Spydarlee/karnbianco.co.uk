import { legendPadding } from "../.././js/chartjs_plugins.js";

// Hide backup elements used when user has no Javascript
document.querySelectorAll(".no-js").forEach(el => el.classList.remove('no-js'));

(async function() {
  Chart.defaults.font.size = 16;

  // { "date": "2024-07-30T00:00:00.000Z", "wastewater": 127.3 }
  const data = await d3.csv('./data.csv', d3.autoType);

  new Chart(
    document.getElementById('chart-canvas'),
    {
      type: 'line',
      plugins: [legendPadding],
      data: {
        labels: data.map(row => row.date.toLocaleDateString('en-GB', { year: "numeric", month: "short", day: "numeric" }) ),
        datasets: [
          {
            label: 'Wastewater (Mgc)',
            data: data.map(row => row.wastewater),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderColor: "#36a3ea",
            backgroundColor: "#36a3ea",
            reverse: true,
          },
          {
            label: '2024 Summer Spike',
            data: data.map(row => 232.22),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderColor: "#fe6284",
            backgroundColor: "#fe6284",
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'COVID Wastewater Levels in Scotland'
          },
          legend: {
            labels: {
              boxWidth: 16,
            }
          },
          legendPadding: {
            paddingTop: 20
          },
        },
        scales: {
          x: {
            afterBuildTicks: function(axis) {
              var labels = axis.getLabels();
              axis.ticks = [
                { value: axis.min, label: labels[axis.min] },
                { value: 270, label: labels[270] },
                { value: 540, label: labels[540] },
                { value: 800, label: labels[800] },
                { value: axis.max, label: labels[axis.max] }
              ]
            },
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function(val, index) {
                var date = new Date(this.getLabelForValue(val));
                return date.toLocaleDateString('en-GB', { year: "numeric", month: "short" });
              },
              align: 'inner',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Wastewater Levels (Mgc)'
            }
          }
        }
      }
    }
  );
})();
