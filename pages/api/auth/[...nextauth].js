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
                            { withCredentials: true }

                        );
                        console.log(a)

                        if (!a) {
                            console.log(a.data.message)

                            throw new Error('Empty response from server');
                        }
                        if (a.data.message) {
                            // Handle error responses from the server

                            console.log(a.data.message)
                            return {
                                status: 'error',
                                message: a.error, // Assuming error message is in 'error' field
                            };
                        } else {
                            console.log(a.data.message)
                            // Assuming a successful response contains data
                            const cookies = a.headers['set-cookie'];
                            res.setHeader('Set-Cookie', cookies);


                            return a.data;
                        }
                    } catch (error) {
                        console.log(a.data.message)
                        console.error(error);
                        return {
                            status: 'error',
                            message: 'An unexpected error occurred',
                        };
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
