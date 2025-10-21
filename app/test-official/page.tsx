'use client';

// import { useState } from 'react';

// type ApiResponse = {
//   success: boolean;
//   credentials?: {
//     apiUserId: string;
//     apiKey: string;
//     accessToken: string;
//   };
//   message?: string;
//   step?: string;
//   error?: string;
//   status?: number;
// }

// export default function TestOfficial() {
//   const [result, setResult] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<string>('');

//   const runOfficialFlow = async () => {
//     setLoading(true);
//     setResult(null);
//     setDebugInfo('Starting...');
    
//     try {
//       setDebugInfo('Calling /api/momo...');
//       console.log('🔄 Calling API...');
      
//       const response = await fetch('/api/momo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('📡 Response status:', response.status);
//       setDebugInfo(`Response status: ${response.status}`);
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log('❌ Response error:', errorText);
//         setDebugInfo(`Error: ${response.status} - ${errorText}`);
//         throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
//       }

//       const data: ApiResponse = await response.json();
//       console.log('✅ Response data:', data);
//       setDebugInfo('Response received successfully');
//       setResult(data);
//     } catch (error) {
//       console.error('💥 Fetch error:', error);
//       setDebugInfo(`Fetch failed: ${error}`);
//       setResult({ 
//         success: false, 
//         error: error instanceof Error ? error.message : 'Unknown error occurred' 
//       });
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px' }}>
//       <h1>Official MTN MoMo Flow Test</h1>
      
//       <button 
//         onClick={runOfficialFlow} 
//         disabled={loading}
//         style={{ 
//           padding: '10px 20px', 
//           fontSize: '16px',
//           backgroundColor: loading ? '#ccc' : '#0070f3',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px'
//         }}
//       >
//         {loading ? 'Running Official MTN Flow...' : 'Run Official MTN Flow'}
//       </button>
      
//       {/* Debug Info */}
//       <div style={{ marginTop: '20px', padding: '10px', background: '#e9ecef', borderRadius: '5px' }}>
//         <h4>Debug Info:</h4>
//         <p>{debugInfo || 'No debug info yet...'}</p>
//       </div>
      
//       {result && (
//         <div style={{ 
//           marginTop: '20px', 
//           padding: '15px', 
//           backgroundColor: result.success ? '#d4edda' : '#f8d7da',
//           border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
//           borderRadius: '5px'
//         }}>
//           <h3>{result.success ? '✅ OFFICIAL FLOW SUCCESS!' : '❌ OFFICIAL FLOW FAILED'}</h3>
          
//           {result.success ? (
//             <div>
//               <p><strong>Your credentials are WORKING!</strong></p>
//               <div style={{ background: '#f8f9fa', padding: '10px', margin: '10px 0', fontSize: '12px' }}>
//                 <p><strong>API User ID:</strong> {result.credentials!.apiUserId}</p>
//                 <p><strong>API Key:</strong> {result.credentials!.apiKey}</p>
//                 <p><strong>Access Token:</strong> {result.credentials!.accessToken}</p>
//               </div>
//               <p><strong>Save these credentials - you'll need them for payments!</strong></p>
//             </div>
//           ) : (
//             <div>
//               <p><strong>Error:</strong> {result.error}</p>
//               {result.step && <p><strong>Failed at step:</strong> {result.step}</p>}
//               {result.status && <p><strong>Status:</strong> {result.status}</p>}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';

type PaymentResponse = {
  success: boolean;
  message?: string;
  referenceId?: string;
  status?: string;
  error?: string;
}

export default function TestPayment() {
  const [result, setResult] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const testPayment = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/momo', {
        method: 'POST'
      });
      
      const data: PaymentResponse = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>💰 Test MTN MoMo Payment</h1>
      <p>This will send a test payment request of 100 EUR to a sandbox number</p>
      
      <button 
        onClick={testPayment} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Sending Payment Request...' : 'Test Payment Request'}
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px'
        }}>
          <h3>{result.success ? '✅ PAYMENT REQUEST SENT!' : '❌ PAYMENT FAILED'}</h3>
          
          {result.success ? (
            <div>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Reference ID:</strong> {result.referenceId}</p>
              <p><strong>Note:</strong> {result.note}</p>
              <p>In a real scenario, the customer would get a USSD prompt to approve this payment.</p>
            </div>
          ) : (
            <div>
              <p><strong>Error:</strong> {result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}