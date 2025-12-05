export class AuthEndPoint {
  static readonly login = '/api/v1/auth/signin';
  static readonly register = '/api/v1/auth/signup';
  static readonly logout = '/api/v1/auth/logout';
  static readonly changePassword = '/api/v1/auth/changePassword';
  static readonly deleteMyAccount = '/api/v1/auth/deleteMe';
  static readonly editProfile = '/api/v1/auth/editProfile';
  static readonly getLoggedUserInfo = '/api/v1/auth/profileData';
  static readonly forgotPassword = '/api/v1/auth/forgotPassword';
  static readonly VerifyResetCode = '/api/v1/auth/verifyResetCode';
  static readonly resetPassword = '/api/v1/auth/resetPassword';
}
