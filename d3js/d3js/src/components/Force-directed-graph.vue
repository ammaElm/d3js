<template>
  <canvas width="960" height="960"></canvas>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      
    }
  },
  mounted () {
    let nodes = d3.range(1000).map((i)=>{
        return {
          index:i
        }
    })
    let links = d3.range(nodes.length-1).map(i=>{
      return {
        source: Math.floor(Math.sqrt(i)),
        target: i+1
      }
    })

    let simulation = d3.forceSimulation(nodes)
                      .force('change',d3.forceManyBody())
                      .force('link',d3.forceLink(links).distance(20).strength(1))
                      .force('x',d3.forceX())
                      .force('y',d3.forceY())
                      .on("tick", ticked);
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    d3.select(canvas)
    .call(d3.drag()
        .container(canvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);

      context.beginPath();
      links.forEach(drawLink);
      context.strokeStyle = "#aaa";
      context.stroke();

      context.beginPath();
      nodes.forEach(drawNode);
      context.fill();
      context.strokeStyle = "#fff";
      context.stroke();

      context.restore();
    }
    function dragsubject() {
      return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
    }

    function dragstarted() {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }



  },
  methods: {
    
  }
}
</script>
<style>

</style>

