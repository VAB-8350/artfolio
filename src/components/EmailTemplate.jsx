export default function EmailTemplate({email, message}) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Nuevo Mensaje de tu Artfolio</h2>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Email:</strong> <a href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a>
      </p>

      <div>
        <strong style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>Mensaje:</strong>
        <p
          style={{
            fontSize: '14px',
            color: '#666',
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          {message}
        </p>
      </div>
    </div>
  )
}
