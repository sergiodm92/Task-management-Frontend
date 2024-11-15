import { toast } from 'react-hot-toast';

type ConfirmToastOptions = {
  message: string; // Mensaje a mostrar
  onConfirm: () => void; // Acción a ejecutar si se confirma
};

export const ConfirmToast = ({ message, onConfirm }: ConfirmToastOptions) => {
  toast((t) => (
    <span>
      {message}
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => {
            onConfirm(); // Ejecuta la acción
            toast.dismiss(t.id); // Cierra el toast
            toast.success('Action completed successfully!');
          }}
          style={{
            padding: '6px 12px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)} // Cancela la acción
          style={{
            padding: '6px 12px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          No
        </button>
      </div>
    </span>
  ), {
    duration: Infinity,
    position: 'top-center',
  });
};
