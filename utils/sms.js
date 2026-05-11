const axios = require('axios');

const sendSMS = async (mobiles, templateId, variables) => {
    const authKey = process.env.MSG91_API_KEY;

    // Use mock logging if key is missing or is the default mock key
    if (!authKey || authKey === 'mock-key') {
        console.log(`[Mock SMS Notification]
        To: ${mobiles}
        Template: ${templateId}
        Data: ${JSON.stringify(variables, null, 2)}
        ------------------------------------------`);
        return { success: true, message: 'Mock SMS logged to console' };
    }

    try {
        const response = await axios.post('https://control.msg91.com/api/v5/flow/', {
            template_id: templateId,
            short_url: "0",
            recipients: [
                {
                    mobiles: mobiles,
                    ...variables
                }
            ]
        }, {
            headers: {
                'authkey': authKey,
                'Content-Type': 'application/json'
            }
        });

        console.log(`[MSG91 Success] API Response:`, response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`[MSG91 Error]`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { sendSMS };
