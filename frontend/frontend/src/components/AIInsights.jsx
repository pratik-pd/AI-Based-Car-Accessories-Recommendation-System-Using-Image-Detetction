function AIInsights({ aiInsights = [] }) {

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-black text-white mb-6">
        AI Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {aiInsights.map((item, index) => (

          <div
            key={index}
            className="bg-[#161616] border border-gray-800 rounded-2xl p-5"
          >

            <p className="text-gray-300">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIInsights;