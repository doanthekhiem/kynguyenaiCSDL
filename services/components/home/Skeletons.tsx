// Loading Skeletons - KynguyenAI v3.0

export function HeroSkeleton() {
  return (
    <section className="mb-12">
      <div className="mb-8">
        <div className="h-10 w-64 skeleton mb-2" />
        <div className="h-6 w-96 skeleton" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        <div className="col-span-1 md:col-span-2 row-span-2 skeleton rounded-2xl" />
        <div className="row-span-2 skeleton rounded-2xl" />
        <div className="skeleton rounded-xl" />
        <div className="skeleton rounded-xl" />
        <div className="skeleton rounded-xl" />
      </div>
    </section>
  );
}

export function FeaturedToolsSkeleton() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="h-8 w-48 skeleton mb-2" />
        <div className="h-5 w-80 skeleton" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton rounded-xl h-64" />
        ))}
      </div>
    </section>
  );
}

export function NewsletterNewsSkeleton() {
  return (
    <section className="py-12">
      <div className="mb-8">
        <div className="h-8 w-48 skeleton mb-2" />
        <div className="h-5 w-64 skeleton" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[300px] skeleton rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[200px] skeleton rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}
