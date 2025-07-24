type Props = {
  items: { label: string; href?: string }[];
};

export default function BreadcrumbLanding({ items }: Props) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ul className="flex space-x-1">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.href ? (
              <>
                <a href={item.href} className="hover:underline text-blue-600">
                  {item.label}
                </a>
                <span className="mx-1">/</span>
              </>
            ) : (
              <span className="font-semibold text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
