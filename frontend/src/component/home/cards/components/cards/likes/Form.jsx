import {useState} from 'react'

const Form = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState('');
    const [hasAccount, setHasAccount] = useState(true)

    const endpoint = hasAccount ? "api/user/login" : "api/user/"

    const validateEmail = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setEmailError("Email is invalid")
            return false
        } else {
            setEmailError(null)
            return true
        }

    }
    
    const validatePassword = () => {
        if(!password || !password.trim()) {
            setPasswordError('Password is required')
            return false
        } else {
            setPasswordError(null)
            return true
        }

    }


    const handleSubmit = async () => {

        const validEmail = validateEmail()
        const validPassword = validatePassword()

        if(validEmail && validPassword) {
            setLoading(true);
            setError('');

            try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                hasAccount ? console.log('Login successful:', data) : console.log('Sign up successful:', data)
                // Store token or redirect user
                localStorage.setItem('token', data.token);
                setToken(data.token);
                // window.location.href = '/dashboard';
                setError(null)
            } else {
                // Login failed
                setError(data.msg || `${hasAccount? "Login" : "Sign up"} failed. Please try again.`);
            }
            } catch (err) {
                setError('Network error. Please check your connection.');
                console.error(`${hasAccount? "Login" : "Sign up"} error:`, err);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="h-screen flex items-center justify-center bg-black p-4">
            {/* Login form with background image */}
            <div 
                className="w-full max-w-md rounded-2xl  p-8 relative overflow-hidden shadow-[0_0_50px_-10px_rgba(253,224,71,0.5)]"
                style={{
                backgroundImage: 'url(/assets/images/form/form.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
            >
                {/* Black transparent overlay on form */}
                <div className="absolute inset-0 bg-black opacity-70"></div>
                
                {/* Form content */}
                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h2 className={`text-3xl font-bold  ${!hasAccount ? "text-red-500" : "text-indigo-700 "}`}>{hasAccount? 'Sign In' : 'Sign up'}</h2>
                        <p className="text-gray-300 mt-2">Enter your credentials to continue</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="font-sans w-full px-4 py-3 rounded-lg bg-black/40 bg-opacity-10 border border-gray-300 border-opacity-20 text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                                required
                            />
                            <p className="text-red-600">{emailError}</p>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 bg-opacity-10 border border-gray-300 border-opacity-20 text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="password"
                                required
                            />
                            <p className="text-red-600">{passwordError}</p>
                        </div>
                        
                        <p className="text-red-600">{error}</p>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`cursor-pointer w-full text-white py-3 rounded-lg font-semibold ${hasAccount? "bg-indigo-700 hover:bg-indigo-600" : "bg-red-500 hover:bg-red-400"}  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading && ( hasAccount ? "Signing in..." : "Signing up...")}
                            { !loading && (hasAccount ? "Sign in" : "Sign up") }
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-300">
                        {hasAccount ? "Don't have an account?" : "Already have an account?"}
                        <button 
                            className={`font-medium ${hasAccount? 'text-red-500 hover:text-red-400' : 'text-indigo-400 hover:text-indigo-300'} cursor-pointer`}
                            onClick={() => {setHasAccount(prev => !prev)}}
                        >
                            {hasAccount? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Form