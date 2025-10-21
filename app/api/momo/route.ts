// import { v4 as uuidv4 } from 'uuid';
// import { NextResponse } from 'next/server';

// export async function POST() {
//   try {
//     console.log('🔧 Starting MTN API flow...');
    
//     // Check if environment variables are set
//     if (!process.env.MTN_PRIMARY_KEY) {
//       console.log('❌ MTN_PRIMARY_KEY is missing');
//       return NextResponse.json({
//         success: false,
//         error: 'MTN_PRIMARY_KEY environment variable is not set'
//       }, { status: 500 });
//     }

//     console.log('✅ MTN_PRIMARY_KEY found:', process.env.MTN_PRIMARY_KEY.substring(0, 10) + '...');

//     const referenceId = uuidv4();
//     const baseUrl = 'https://sandbox.momodeveloper.mtn.com';
    
//     console.log('Step 1: Creating API User with referenceId:', referenceId);

//     // STEP 1: Create API User
//     const userResponse = await fetch(`${baseUrl}/v1_0/apiuser`, {
//       method: 'POST',
//       headers: {
//         'X-Reference-Id': referenceId,
//         'Ocp-Apim-Subscription-Key': process.env.MTN_PRIMARY_KEY,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         providerCallbackHost: 'https://example.com'
//       })
//     });

//     console.log('📡 User creation response status:', userResponse.status);
    
//     if (!userResponse.ok) {
//       const errorText = await userResponse.text();
//       console.log('❌ User creation failed:', errorText);
      
//       return NextResponse.json({
//         success: false,
//         step: 'create_user',
//         error: `Failed to create user: ${userResponse.status} - ${errorText}`,
//         status: userResponse.status
//       }, { status: 400 });
//     }

//     console.log('✅ API User created successfully');
//     console.log('Step 2: Creating API Key...');
    
//     // STEP 2: Create API Key
//     const keyResponse = await fetch(`${baseUrl}/v1_0/apiuser/${referenceId}/apikey`, {
//       method: 'POST',
//       headers: {
//         'Ocp-Apim-Subscription-Key': process.env.MTN_PRIMARY_KEY,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('📡 API Key creation response status:', keyResponse.status);
    
//     if (!keyResponse.ok) {
//       const errorText = await keyResponse.text();
//       console.log('❌ API Key creation failed:', errorText);
      
//       return NextResponse.json({
//         success: false,
//         step: 'create_apikey',
//         error: `Failed to create API key: ${keyResponse.status} - ${errorText}`,
//         status: keyResponse.status
//       }, { status: 400 });
//     }

//     const keyData = await keyResponse.json() as { apiKey: string };
//     const apiKey = keyData.apiKey;
//     console.log('✅ API Key created successfully');

//     console.log('Step 3: Getting OAuth Token...');
    
//     // STEP 3: Get OAuth Token
//     const tokenResponse = await fetch(`${baseUrl}/collection/token/`, {
//       method: 'POST',
//       headers: {
//         'Ocp-Apim-Subscription-Key': process.env.MTN_PRIMARY_KEY,
//         'Authorization': 'Basic ' + Buffer.from(`${referenceId}:${apiKey}`).toString('base64')
//       }
//     });

//     console.log('📡 Token response status:', tokenResponse.status);
    
//     if (!tokenResponse.ok) {
//       const errorText = await tokenResponse.text();
//       console.log('❌ Token creation failed:', errorText);
      
//       return NextResponse.json({
//         success: false,
//         step: 'get_token',
//         error: `Failed to get token: ${tokenResponse.status} - ${errorText}`,
//         status: tokenResponse.status
//       }, { status: 400 });
//     }

//     const tokenData = await tokenResponse.json() as { access_token: string; expires_in: number };
//     const accessToken = tokenData.access_token;
//     console.log('✅ OAuth Token obtained successfully');

//     // SUCCESS!
//     console.log('🎉 All steps completed successfully!');
//     return NextResponse.json({
//       success: true,
//       credentials: {
//         apiUserId: referenceId,
//         apiKey: apiKey,
//         accessToken: accessToken
//       },
//       message: '✅ Official MTN flow completed successfully!'
//     });

//   } catch (error) {
//     console.error('💥 Unexpected error:', error);
//     return NextResponse.json({
//       success: false,
//       error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
//     }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    const referenceId = uuidv4();
    const baseUrl = 'https://sandbox.momodeveloper.mtn.com';
    
    // Use the sandbox test number that always succeeds
    const testPhoneNumber = '0774506291'; // This should work based on MTN docs
    
    console.log('💰 Testing payment request...');

    const paymentResponse = await fetch(`${baseUrl}/collection/v1_0/requesttopay`, {
      method: 'POST',
      headers: {
        'X-Reference-Id': referenceId,
        'Ocp-Apim-Subscription-Key': process.env.MTN_PRIMARY_KEY!,
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImZjNDIwY2ZhLWE2YzUtNDBjOC04YjQ1LTNkNjg4ZWM1YTQwZSIsImV4cGlyZXMiOiIyMDI1LTEwLTIxVDA5OjI2OjIzLjU2MSIsInNlc3Npb25JZCI6ImMzMTU4MWYwLTkxNmMtNGQ0NC1hODE3LWJiMDdjZjdiMWU0MCJ9.elDYQghR8TJvKZY0Kpe5m_of1aHKMgD-Ltj2hGfEIGFQexQEXkrclbPQbLW_MMRlcf8oS5CmXb8SQqmxnxPRe6mhBQ-_tHcYpuzxVLc5k1Z3TTiBEdZmrDuokdWp8XgOvXLSzF2grlqxmqxWxqZsjcOEyd4XyYm7FmnM_C70IUjsguw0r_4WnzdAMD1af7uVKLD3Q6o9r3YW1e2mvfqIL-wj6NcEI5925QO7Jg29f5grIJf_0lF_niDxsnDU4izdFt3jvTEvGIg5im6XedxV360MLnZuhxm9_aTIZFg43Sjvx-M1sal3Xa2MqZDgEiwilWxHOqyT3KvDReRdakHhDA`,
        'X-Target-Environment': 'sandbox',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: '1000',
        currency: 'UGX',
        externalId: '12345',
        payer: {
          partyIdType: 'MSISDN',
          partyId: testPhoneNumber
        },
        payerMessage: 'Test payment',
        payeeNote: 'Test note'
      })
    });

    console.log('📡 Payment response status:', paymentResponse.status);

    if (paymentResponse.status === 202) {
      return NextResponse.json({
        success: true,
        message: '✅ Payment request sent successfully!',
        referenceId: referenceId,
        status: 'PENDING',
        note: 'The payment is waiting for customer approval'
      });
    } else {
      const errorText = await paymentResponse.text();
      return NextResponse.json({
        success: false,
        error: `Payment failed: ${paymentResponse.status} - ${errorText}`,
        status: paymentResponse.status
      }, { status: 400 });
    }

  } catch (error) {
    console.error('💥 Payment error:', error);
    return NextResponse.json({
      success: false,
      error: `Payment error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}