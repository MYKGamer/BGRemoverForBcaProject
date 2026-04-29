'use client'

import { useState } from 'react'
import { login, signup, loginWithGoogle } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleAction(formData: FormData, action: 'login' | 'signup') {
    setIsLoading(true)
    const result = action === 'login' ? await login(formData) : await signup(formData)
    
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    } else {
      toast.success(action === 'login' ? 'Successfully logged in!' : 'Successfully signed up!')
      // Redirect happens automatically in the server action
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true)
    const result = await loginWithGoogle()
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-[#18181b] border-[#27272a] text-[#fafafa] shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">BGRemover AI</CardTitle>
        <CardDescription className="text-[#a1a1aa]">
          Fast and clean background removal for all your photos
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#09090b] p-1 border-[#27272a]">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white"
            >
              Create Account
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form action={(fd) => handleAction(fd, 'login')} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-[#09090b] border-[#27272a] focus:ring-[#2563eb] focus:border-[#2563eb]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-[#09090b] border-[#27272a] focus:ring-[#2563eb] focus:border-[#2563eb]"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:translate-y-[1px]"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <form action={(fd) => handleAction(fd, 'signup')} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-[#09090b] border-[#27272a] focus:ring-[#2563eb] focus:border-[#2563eb]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-[#09090b] border-[#27272a] focus:ring-[#2563eb] focus:border-[#2563eb]"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:translate-y-[1px]"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#27272a]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#18181b] px-2 text-[#a1a1aa]">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="border-[#27272a] hover:bg-[#27272a] text-[#fafafa] transition-all"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          )}
          Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-sm text-[#a1a1aa]">
        <p>
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline hover:text-white">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-white">Privacy Policy</a>.
        </p>
      </CardFooter>
    </Card>
  )
}
