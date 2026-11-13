const { remote } = require('webdriverio');

const opts = {
    path: '/',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'AndroidDevice',
        'appium:noReset': true
    }
};

const MALE_NAMES = [
    "Rajesh Kumar", "Amit Sharma", "Sanjay Singh", "Vijay Verma", "Manoj Yadav",
    "Sunil Patel", "Ramesh Prasad", "Dharmendra Kumar", "Pankaj Das", "Anil Gupta",
    "Ravi Shankar", "Deepak Kumar", "Suresh Sahni", "Vikas Pandit", "Rakesh Mishra",
    "Alok Ranjan", "Mukesh Kumar", "Santosh Roy", "Ajay Malhotra", "Pravin Kumar",
    "Bikram Singh", "Dinesh Chandra", "Ashok Kumar", "Gaurav Srivastava", "Manish Pandey"
];

const FEMALE_NAMES = [
    "Sunita Devi", "Anita Sharma", "Pooja Devi", "Rekha Kumari", "Manju Devi",
    "Suman Lata", "Kiran Devi", "Geeta Sharma", "Seema Kumari", "Asha Devi",
    "Usha Devi", "Meena Kumari", "Rita Devi", "Sangita Sharma", "Shanti Devi",
    "Kavita Kumari", "Sarita Devi", "Rinku Devi", "Mamta Kumari", "Priyanka Sharma",
    "Shobha Devi", "Bina Devi", "Sushila Devi", "Nirmala Kumari", "Poonam Devi"
];

const PHONE_NUMBERS = ["9955254569", "9661020391"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomDOB() {
    const currentYear = new Date().getFullYear();
    const randomAge = Math.floor(Math.random() * (50 - 35 + 1)) + 35; // Age 35–50
    const birthYear = currentYear - randomAge;

    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

    return {
        formattedDOB: `${randomDay}-${randomMonth}-${birthYear}`,
        age: randomAge
    };
}

/**
 * Native Android UiScrollable helper by resourceId
 */
async function scrollToId(driver, resourceId) {
    return await driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${resourceId}"))`
    );
}

/**
 * Native Android UiScrollable helper by partial text
 */
async function scrollToTextContains(driver, text) {
    return await driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`
    );
}

async function fillIndividualForm() {
    const driver = await remote(opts);

    try {
        console.log("Connected to active screen. Starting data entry...");

        // --- STEP 1: Enrollment Date Selection & Confirmation ---
        const dateField = await scrollToId(driver, "org.cphc.ncd.anm:id/edit_text_enrollment_form_date");
        await dateField.waitForDisplayed({ timeout: 5000 });
        await dateField.click();
        await driver.pause(1000);

        const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
        await okButton.waitForDisplayed({ timeout: 5000 });
        await okButton.click();
        await driver.pause(500);
        console.log("Date selected and confirmed!");

        // --- STEP 2: Village Dropdown Selection ---
        const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
        await villageSpinner.waitForDisplayed({ timeout: 5000 });
        await villageSpinner.click();
        await driver.pause(800);

        const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
        await villageOption.waitForDisplayed({ timeout: 5000 });
        await villageOption.click();
        await driver.pause(500);
        console.log("Village selected successfully!");

        // --- STEP 3: Gender & Name Selection ---
        const isMale = Math.random() < 0.5;
        const selectedName = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);

        const nameInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_name");
        await nameInput.waitForDisplayed({ timeout: 5000 });
        await nameInput.setValue(selectedName);

        if (isMale) {
            const maleRadio = await scrollToId(driver, "org.cphc.ncd.anm:id/enrolment_gender_male");
            await maleRadio.click();
        } else {
            const femaleRadio = await scrollToId(driver, "org.cphc.ncd.anm:id/enrolment_gender_female");
            await femaleRadio.click();
        }

        // --- STEP 4: Date of Birth & Calculated Age ---
        const { formattedDOB, age } = generateRandomDOB();

        const dobInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_dob");
        await dobInput.waitForDisplayed({ timeout: 5000 });
        await dobInput.click();
        await dobInput.setValue(formattedDOB);

        const ageInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_approx_age");
        await ageInput.waitForDisplayed({ timeout: 5000 });
        await ageInput.setValue(String(age));

        console.log(`Generated: ${selectedName} | Gender: ${isMale ? 'Male' : 'Female'} | Age: ${age} | DOB: ${formattedDOB}`);

        // --- STEP 5: Mobile Number Selection ---
        const selectedMobile = getRandomItem(PHONE_NUMBERS);
        const mobileInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_mobile_number");
        await mobileInput.waitForDisplayed({ timeout: 5000 });
        await mobileInput.setValue(selectedMobile);

        // Hide keyboard to unblock bottom save button
        try {
            await driver.hideKeyboard();
        } catch (e) {
            // Keyboard already dismissed
        }

        // --- STEP 6: Save Section ---
        const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/image_button_quick_enrolment_save");
        await saveButton.waitForDisplayed({ timeout: 5000 });
        await saveButton.click();
        console.log("Save clicked, waiting for confirmation popup...");

        // --- STEP 7: Wait for Success Popup & Click OK ---
        const successOkButton = await driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
        await successOkButton.waitForDisplayed({ timeout: 15000 });
        await successOkButton.click();
        console.log("Section successfully filled, saved, and confirmed!");

    } catch (error) {
        console.error("Execution error:", error);
    } finally {
        await driver.deleteSession();
    }
}

fillIndividualForm();