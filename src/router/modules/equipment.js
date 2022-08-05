import Layout from "@/layout";
export default {
  path: "/equipment",
  component: Layout,
  name: "Equipment",
  meta: { title: "设备管理", icon: "shebei" },
  children: [
    {
      path: "devicestage",
      name: "Devicestage",
      component: () => import("@/views/equipment/devicestage"),
      meta: { title: "设备管理" },
    },
    {
      path: "status",
      name: "Status",
      component: () => import("@/views/equipment/status"),
      meta: { title: "设备状态" },
    },
    {
      path: "typemange",
      name: "Typemange",
      component: () => import("@/views/equipment/typemange"),
      meta: { title: "设备类型管理" },
    },
  ],
};
