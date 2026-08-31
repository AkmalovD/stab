import { useState } from 'react';

const LoginStep1: React.FC =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password, rememberMe });
    }

    return (
        <>
        <main className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#0d171b] mb-2 text-center">
                Welcome!
            </h1>
            <p className="text-[#4c809a] text-center mb-8">
                Sign in to continue your study abroad journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <div>
                    <label htmlFor="" className="block-text-sm font-medium">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                {/*  Password input  */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#4c809a] mb-2">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba]"
                            placeholder="••••••••"
                            required
                        />
                    </label>
                </div>
                {/*  Remember Me & Forgot password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-[#0d98ba] focus:ring-[#0d98ba] border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-[#4c809a]">
                            Remember Me
                        </label>
                    </div>

                {/*  Login Button  */}
                    <button
                        type="submit"
                        className="w-full bg-[#0d98ba] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d98ba] transition-colors"
                    >
                        Sign in

                    </button>
                </div>
            </form>

        {/*  Divider  */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#4c809a]">Or continue with</span>
            </div>


        </main>
        </>
    )
}

export default LoginStep1;