const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }
  
  export default LoadingSpinner
  