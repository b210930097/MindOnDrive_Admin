// 'use client';

// import { Routes } from '@/config/routes';
// import { VerticalNavItemsType } from '@/types/layoutTypes';
// import {
//   Bell01,
//   Calendar,
//   Inbox01,
//   PieChart03,
//   ShoppingCart01,
//   UserCheck02,
//   Users01,
// } from '@untitled-ui/icons-react';
// import { useRouter } from 'next/navigation';

// export const AdminSidebarMenus = ({ pathname }: { pathname: string }): VerticalNavItemsType => {
//   const router = useRouter();
//   return [
//     // Admin_Dashboard
//     {
//       key: Routes.Admin_Dashboard.key,
//       label: Routes.Admin_Dashboard.Index.title,
//       icon: <PieChart03 />,
//       onClick: () => router.push(Routes.Admin_Dashboard.Index.route),
//       action: Routes.Admin_Dashboard.Index.action,
//       subject: Routes.Admin_Dashboard.Index.subject,
//       auth: !!Routes.Admin_Dashboard.Index.shouldBeAuthenticated,
//     },
//     // Admin_Invoice
//     {
//       key: Routes.Admin_Invoice.key,
//       label: Routes.Admin_Invoice.Index.title,
//       icon: <Inbox01 />,
//       onClick: () => router.push(Routes.Admin_Invoice.Index.route),
//       action: Routes.Admin_Invoice.Index.action,
//       subject: Routes.Admin_Invoice.Index.subject,
//       auth: !!Routes.Admin_Invoice.Index.shouldBeAuthenticated,
//     },
//     // Admin_Host
//     {
//       key: Routes.Admin_Host.key,
//       label: Routes.Admin_Host.Index.title,
//       icon: <UserCheck02 />,
//       onClick: () => router.push(Routes.Admin_Host.Index.route),
//       action: Routes.Admin_Host.Index.action,
//       subject: Routes.Admin_Host.Index.subject,
//       auth: !!Routes.Admin_Host.Index.shouldBeAuthenticated,
//     },
//     // Admin_Merchant
//     // {
//     //   key: Routes.Admin_Merchant.key,
//     //   label: Routes.Admin_Merchant.Index.title,
//     //   icon: <Building01 />,
//     //   onClick: () => router.push(Routes.Admin_Merchant.Index.route),
//     //   action: Routes.Admin_Merchant.Index.action,
//     //   subject: Routes.Admin_Merchant.Index.subject,
//     //   auth: !!Routes.Admin_Merchant.Index.shouldBeAuthenticated,
//     // },
//     // Admin_Order
//     {
//       key: Routes.Admin_Order.key,
//       label: Routes.Admin_Order.Index.title,
//       icon: <ShoppingCart01 />,
//       onClick: () => router.push(Routes.Admin_Order.Index.route),
//       action: Routes.Admin_Order.Index.action,
//       subject: Routes.Admin_Order.Index.subject,
//       auth: !!Routes.Admin_Order.Index.shouldBeAuthenticated,
//     },
//     // Admin_Event
//     {
//       key: Routes.Admin_Event.key,
//       label: Routes.Admin_Event.Index.title,
//       icon: <Calendar />,
//       onClick: () => router.push(Routes.Admin_Event.Index.route),
//       action: Routes.Admin_Event.Index.action,
//       subject: Routes.Admin_Event.Index.subject,
//       auth: !!Routes.Admin_Event.Index.shouldBeAuthenticated,
//     },
//     // Admin_User
//     {
//       key: Routes.Admin_User.key,
//       label: Routes.Admin_User.Index.title,
//       icon: <Users01 />,
//       onClick: () => router.push(Routes.Admin_User.Index.route),
//       action: Routes.Admin_User.Index.action,
//       subject: Routes.Admin_User.Index.subject,
//       auth: !!Routes.Admin_User.Index.shouldBeAuthenticated,
//     },
//     // Admin_Notification
//     {
//       key: Routes.Admin_Notification.key,
//       label: Routes.Admin_Notification.Index.title,
//       icon: <Bell01 />,
//       onClick: () => {
//         if (pathname === Routes.Admin_Notification.Index.route) window.location.reload();
//         else router.push(Routes.Admin_Notification.Index.route);
//       },
//       action: Routes.Admin_Notification.Index.action,
//       subject: Routes.Admin_Notification.Index.subject,
//       auth: !!Routes.Admin_Notification.Index.shouldBeAuthenticated,
//     },
//   ];
// };
