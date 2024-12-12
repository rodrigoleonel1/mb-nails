interface TitleProps {
  title: String;
  subtitle: String;
}

export default function TitleHeader({ title, subtitle }: TitleProps) {
  return (
    <header>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm">{subtitle}</p>
    </header>
  );
}
