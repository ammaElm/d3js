<template>
  <div id="graph">

  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      nodes:[
        {x: 30, y: 50, name: 'aaa'},
        {x: 50, y: 80, name: 'bbb'},
        {x: 90, y: 120, name: 'ccc'}
      ],
      links:[],
      graph: null,
    }
  },
  mounted () {
    this.graph = d3.select('#graph')
                  .append('svg')
                  .attr('width',600)
                  .attr('height',400)
    // let links = [
    //     {source: this.nodes[0], target: this.nodes[1]},
    //     {source: this.nodes[2], target: this.nodes[1]}
    // ]
    this.graph.text("The Graph")
        .select("#graph")
    let _this = this
    let nodes = this.graph.selectAll('circle .nodes')
        .data(this.nodes)
        .enter().append('svg:circle')
        .attr('class','notes')
        .attr('cx', d=>{return d.x})
        .attr('cy', d=>{return d.y})
        .attr("r", "5px")
        .attr("fill", "black")
        .text(d=>{return d.name})
        .style('color','#fff')
        .call(d3.drag()
          .on('start',function(){
            // console.log(d3.select(this))
            d3.select(this).classed("active", true);
          })
          .on('drag',function(d){
            d3.select(this)
              .attr('cx', d.x = d3.event.x)
              .attr('cy', d.y = d3.event.y)
            _this.drawLine()
          })
          .on('end',function(){
            d3.select(this).classed("active", false);
          })
        )

    this.drawLine()
    

  },
  methods: {
    nodeStart(node){
      console.log(d3.event.x)
    },
    nodeDrag(node){
      console.log(d3.event.x)
    },
    nodeEnd(){

    },
    drawLine(){
      let links = [
        {source: this.nodes[0], target: this.nodes[1]},
        {source: this.nodes[2], target: this.nodes[1]}
      ]
      this.graph.selectAll('.node-line').remove()
      this.graph.selectAll('.line')
        .data(links)
        .enter().append('svg:line')
        .attr('class','node-line')
        .attr('x1',d => {return d.source.x})
        .attr('y1',d => {return d.source.y})
        .attr('x2',d => {return d.target.x})
        .attr('y2',d => {return d.target.y})
        .style('stroke','rgb(6,120,155)')
    }
    
  }
}
</script>
<style>
.active.notes{
  stroke: pink;
  stroke-width: 2px;
}
</style>

