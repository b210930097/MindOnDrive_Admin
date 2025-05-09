interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function ProfileCard({ title, description, children }: Props) {
  return (
    <div className="flex w-full flex-row items-start justify-between gap-7xl rounded-2xl border-[1px] border-solid border-gray bg-white p-6xl font-sans ">
      <div className="text-secondary-contrast w-full font-medium">
        {title}
        <div className="text-secondary">{description}</div>
      </div>
      <div className="text-secondary-contrast flex size-full flex-col items-start gap-6xl rounded-md border-[1px] border-solid border-gray p-6xl text-text-sm font-medium">
        {children}
      </div>
    </div>
  );
}
