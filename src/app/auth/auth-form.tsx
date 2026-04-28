'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2, Chrome } from 'lucide-react'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleAction(formData: FormData, action: 'login' | 'signup') {
    setIsLoading(true)
    try {
      const result = action === 'login' ? await login(formData) : await signup(formData)
      
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(action === 'login' ? 'Successfully logged in!' : 'Successfully signed up!')
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-[#18181b] border-[#27272a] text-[#fafafa] shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">BGRemover AI</CardTitle>
        <CardDescription className="text-[#a1a1aa]">
          Sophisticated background removal for professional workflows
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

        <Button variant="outline" className="border-[#27272a] hover:bg-[#27272a] text-[#fafafa] transition-all">
          <Chrome className="mr-2 h-4 w-4" />
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
