import { legendPadding } from "../.././js/chartjs_plugins.js";

// Hide backup elements used when user has no Javascript
document.querySelectorAll(".no-js").forEach(el => el.classList.remove('no-js'));

(async function() {
  Chart.defaults.font.size = 16;

  // { "date", "cumulative_central", "confirmed", "cumulative_upper", "cumulative_lower" }
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
            label: 'Upper Bound',
            data: data.map(row => row.cumulative_upper),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderColor: "#fe6284",
            backgroundColor: "#fe6284",
            reverse: true,
          },
          {
            label: 'Central Estimate',
            data: data.map(row => row.cumulative_central),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderColor: "#36a3ea",
            backgroundColor: "#36a3ea",
            reverse: true,
          },
          {
            label: 'Lower Bound',
            data: data.map(row => row.cumulative_lower),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderColor: "#fe9f41",
            backgroundColor: "#fe9f41",
            reverse: true,
          },
          {
            label: 'Confirmed Deaths',
            data: data.map(row => row.confirmed),
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2,
            borderColor: "#666",
            backgroundColor: "#666",
            reverse: true,
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
            text: 'Estimated Excess Deaths due to COVID-19'
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
                { value: 60, label: labels[60] },
                { value: 120, label: labels[120] },
                { value: 180, label: labels[180] },
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
            suggestedMin: 0,
            title: {
              display: true,
              text: 'Deaths (Worldwide)'
            },
            ticks: {
              callback : function(val, index) {
                return  (val > 0) ? val/1000000 + ' million' : 0;
              }
            }
          }
        }
      }
    }
  );
})();
