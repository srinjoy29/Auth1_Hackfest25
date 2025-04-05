// <<<<<<< HEAD
// // export async function getUserFromDBOrSession(req) {
// //     // Passport adds `user` to the request after successful JWT auth
// //     const user = req.user;
  
// //     if (!user || !user.email || !user.accessToken || !user.refreshToken) {
// //       return null; // Incomplete user data
// //     }
  
// //     // You can optionally fetch from DB if needed
// //     // Example: const fullUser = await UserModel.findOne({ email: user.email });
  
// //     return user; // returning user with tokens (access/refresh)
// //   }
// =======
// export async function getUserFromDBOrSession(req) {
//     // Passport adds `user` to the request after successful JWT auth
//     const user = req.user;
  
//     if (!user || !user.email || !user.accessToken || !user.refreshToken) {
//       return null; // Incomplete user data
//     }
  
//     // You can optionally fetch from DB if needed
//     // Example: const fullUser = await UserModel.findOne({ email: user.email });
  
//     return user; // returning user with tokens (access/refresh)
//   }
// >>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
