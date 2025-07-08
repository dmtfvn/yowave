import useSocket from '../../hooks/sockets/useSocket';

export default function Options() {
  useSocket();

  return (
    <section className="flex-center">
      <h1>Options View</h1>
    </section>
  );
}
