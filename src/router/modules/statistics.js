import Layout from "@/layout";
export default {
  path: "/statistics",
  component: Layout,
  redirect: '/statistics/index',
  children: [
    {
      path: "/statistics/index",
      name: "Statistics",
      meta: { title: "对账统计", icon: "duizhang" },
      component: () => import("@/views/Order"),
    },
  ],
};
