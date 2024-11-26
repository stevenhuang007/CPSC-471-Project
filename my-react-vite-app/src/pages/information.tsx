function Information() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Information</h1>
      <p className="text-lg">
        Welcome to the information page! Here, you can find details about the
        application, FAQs, and general guidelines.
      </p>

      {/* Example: Placeholder for FAQs or other information */}
      <div className="mt-6 space-y-4">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold">What is this app about?</h2>
          <p className="text-gray-600">
            This app provides player statistics, team information, and more.
          </p>
        </div>

        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold">How do I navigate?</h2>
          <p className="text-gray-600">
            Use the navbar at the top of the page to navigate between different
            sections.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Information;
