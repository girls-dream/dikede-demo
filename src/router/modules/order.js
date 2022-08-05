import Layout from "@/layout";
export default {
  path: "/order",
  component: Layout,
  redirect: "/order/index",
  children: [
    {
      path: "/order/index",
      name: "Order",
      meta: { title: "订单管理", icon: "dingdan" },
      component: () => import("@/views/Order"),
    },
  ],
};
