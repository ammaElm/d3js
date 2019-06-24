<template>
  <svg width="960" height="500">
    <rect fill="#fff" width="100%" height="100%"></rect>
  </svg>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      line: null,
      svg: null,
    }
  },
  mounted () {
    this.line = d3.line()
                .curve(d3.curveBasis);

    this.svg = d3.select("svg")
      .call(d3.drag()
            .container(function() { return this; })
            .subject( () => { let p = [d3.event.x, d3.event.y]; return [p, p]; })
            .on("start", this.dragstarted));
    
  },
  methods: {
    dragstarted() {
      let d = d3.event.subject,
          active = this.svg.append("path").datum(d),
          x0 = d3.event.x,
          y0 = d3.event.y;
      d3.event.on("drag", () => {
        let x1 = d3.event.x,
            y1 = d3.event.y,
            dx = x1 - x0,
            dy = y1 - y0;
        if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1]);
        else d[d.length - 1] = [x1, y1];
        active.attr("d", this.line);
      });
    }
  }
}
</script>
<style>
  path {
    fill: none;
    stroke: #000;
    stroke-width: 3px;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

</style>


