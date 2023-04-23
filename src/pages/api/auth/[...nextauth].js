import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const user = await fetch(`${process.env.BASE_URL_API}/get-usuario?nombre_usu=${credentials.username}&contrasena=${credentials.password}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(response => response.json())
                    .catch(error => console.error("Error", error));
                if (user.token) {
                    return user;
                } else {
                    console.log("check your credentials");
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        // jwt: async ({ token, user }) => {
        //     if (user) {
        //         token.email = user.email;
        //         token.username = user.username;
        //         token.accessToken = user.token;
        //     }

        //     return token;
        // },

        // async session({ session, token }) {
        //     session.accessToken = token.accessToken;
        //     session.user = token.user;

        //     return session;
        // }
    }
};


export default NextAuth(authOptions);