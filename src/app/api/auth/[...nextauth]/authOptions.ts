import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
    providers: [
        // Authentication Provider, use Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Email", type: "email", placeholder: "Email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied

              if(!credentials) return null
              const user = await userLogIn(credentials.username, credentials.password)
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                return null
              }
            }
          })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },

        async session({session, token, user}) {
            session.user = token as any
            return session
        }
    }
}