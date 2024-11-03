export const legendPadding = {
  id: 'legendPadding',
  beforeInit(chart, legend, options){
      let fitValue = chart.legend.fit;
      chart.legend.fit = function fit(){
          fitValue.bind(chart.legend)();
          return this.height += options.paddingTop;
      }
  },
  defaults: {
    paddingTop: 0
  }
};
