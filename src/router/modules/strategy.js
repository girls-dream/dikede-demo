import Layout from "@/layout";
export default {
  path: "/strategy",
  component: Layout,
  redirect: '/strategy/index',
  children: [
    {
      path: "/strategy/index",
      name: "Strategy",
      meta: { title: "策略管理", icon: "celue" },
      component: () => import("@/views/Strategy"),
    },
  ],
};
