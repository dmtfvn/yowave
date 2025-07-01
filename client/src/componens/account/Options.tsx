import useSocketIO from '../../hooks/useSocketIO';

export default function Options() {
  useSocketIO();

  return (
    <section className="flex-center">
      <h1>Options View</h1>
    </section>
  );
}
