export interface AuthState {
    email: string;
    displayName: string;
    jwt: string;
    permission: PermissionProps;
    role: string;
    userName: string;
    isAuth: Boolean;
}

export interface PermissionProps {
    realTimeData: Boolean;
    canTrade: Boolean;
    canViewOrders: Boolean;
}