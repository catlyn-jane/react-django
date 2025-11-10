import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

function Login() {
  const [hidden, setHidden] = useState<boolean>(true)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigation = useNavigate()

  
  const login = (getValue: string) => {
 
    const data  = {
      username: username,
      password: password,
      value: getValue
    }

    if(username && password){
      localStorage.setItem("user", JSON.stringify(data))
      navigation("/main")
      toast.success("Login successful!", {position: "bottom-center"})
    }else{
      toast.warning("Please fill up all forms",{position: "bottom-center"})
    }

  }

  const reset = () => {
    setUsername("")
    setPassword("")
  }
  useEffect(() => {
    console.log("on state change") // states always changes when loading
    setHidden(username || password ? false : true)
  }, [username, password])

  useEffect(() => {
    console.log("On mount")
    setHidden(username || password ? false : true)
  }, []) 

  return (
    <>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>
            Login Form
          </CardTitle>
          <CardDescription>
            Tailwind CSS nagbago
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>

            <div className='flex-1 flex-col gap-2 flex'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className='flex-1 flex-col gap-2 flex'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id="password"
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-4'>
          <Button type="button" className='w-full' onClick={() => login("value")} disabled={!username}>
            Login
          </Button>
          <Button variant="ghost" type='button' className={hidden ? 'hidden' : 'w-full'} onClick={reset}>
            Reset
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default Login
