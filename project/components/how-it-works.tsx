export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Enter Route",
      description: "Input your pickup and drop-off locations along with your preferred time.",
      icon: "📍",
    },
    {
      id: 2,
      title: "View Map & Compare Fares",
      description: "See real-time prices, ETAs, and traffic conditions across multiple cab services.",
      icon: "🗺️",
    },
    {
      id: 3,
      title: "Book Instantly",
      description: "Choose the best option and book directly through our platform with one click.",
      icon: "🚗",
    },
  ]

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
      <div className="space-y-12 relative">
        {steps.map((step, index) => (
          <div key={step.id} className="md:grid md:grid-cols-2 md:gap-8 relative">
            <div className={`md:text-right ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
              <div className="bg-card p-6 rounded-lg shadow-sm border relative">
                <div className="absolute top-6 -right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold hidden md:flex">
                  {step.id}
                </div>
                <div className="flex md:hidden items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <h3 className="text-xl font-bold hidden md:block">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </div>
            <div
              className={`hidden md:flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } ${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                {step.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

