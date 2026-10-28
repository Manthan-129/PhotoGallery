function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-blue-600 text-lg font-medium">Loading Photos.</p>
    </div>
  );
}

export default LoadingSpinner;
