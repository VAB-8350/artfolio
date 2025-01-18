import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@/utils/mongodb'
import User from '@/Models/User'

const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    async signIn({user}) {
      await connectDB()
      const profile = await User.findOne({email: user.email})

      if (profile) {
        return true
      }

      return '/'
    },
    async session({session}) {
      await connectDB()
      const profile = await User.findOne({email: session?.user?.email})

      if(profile) {
        session.user.name = profile.name
        session.user.role = profile.role
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }