export { default } from 'next-auth/middleware';

export const config = {
    matcher : ["/api/auth/signin", "/api/auth/signout", "/mybooking", "/campgrounds"],
};