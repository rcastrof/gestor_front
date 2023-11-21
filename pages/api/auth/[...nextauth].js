process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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

                        console.log(a)
                        if (a.error) {
                            return a
                        } else {

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
    };
};

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};