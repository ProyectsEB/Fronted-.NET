const EmpleadoSkeletonRow = () => {
    return (
      <tr className="animate-pulse bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="p-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
        </td>
      </tr>
    )
  }
  
  export default EmpleadoSkeletonRow
  