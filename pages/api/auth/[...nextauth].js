process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



const nextAuthOptions = (req, res) => {



    return {
        providers: [
            CredentialsProvider({
                async authorize(credentials) {

                    try {
                        const { email, password } = credentials;
                        const a = await axios.post(
                            'https://localhost:7013/v1/login/login',
                            { email, password },
                            { withCredentials: true })

                            .then(response => {
                                return response;
                            }).catch(error => {
                                console.log(error)
                                return { error: new Error(error.response.data.err.message) };
                            });



                        if (a.error) {
                            return a
                        } else {
                            const sessionToken = a.data.token;
                            const decodedToken = jwtDecode(sessionToken);
                            const user = {
                                id: decodedToken.id,
                                name: decodedToken.unique_name,
                                lastName: decodedToken.family_name,
                                email: decodedToken.email,
                                role: decodedToken.role,
                            };



                            a.user = user;

                            return a.data;

                        }

                    } catch (error) {
                        console.log(error)

                    }
                },
            }),
        ],

        pages: {
            signIn: '/',
            error: '/',
            signOut: '/',
            newUser: null,

        },
        secret: 'safgopjpa29+va5cas29as',
        session: {
            jwt: true,
            strategy: 'jwt',

        },
        tokens: {
            jwt: true,
            maxAge: 60 * 60 * 24 * 30,
        },

        callbacks: {
            
        },
    };
};

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};