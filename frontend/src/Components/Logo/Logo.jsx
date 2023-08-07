export default function Logo({ src }) {
  return (
    <a href="/" className="logo">
      <img className="logo__image" src={src} alt="Логотип" />
    </a>
  );
}
