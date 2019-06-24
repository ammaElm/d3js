import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Clock from "./components/Clock";
import Graph from "./components/Graph";
import Line from "./components/Line"
import ForceDirectedGraph from './components/Force-directed-graph';
import Tree from './components/Tree';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "Line/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/clock",
      name: "clock",
      component: Clock
    },
    {
      path: "/graph",
      name: "graph",
      component: Graph
    },
    {
      path: "/line",
      name: "line",
      component: Line
    },
    {
      path: "/forceDirectedGraph",
      name: "forceDirectedGraph",
      component: ForceDirectedGraph
    },
    {
      path: "/tree",
      name: "tree",
      component: Tree
    }

  ]
});
