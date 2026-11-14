//  ============= final code

const { remote } = require('webdriverio');

const opts = {
    path: '/',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'AndroidDevice',
        'appium:noReset': true,
        'appium:dontStopAppOnReset': true,
        'appium:newCommandTimeout': 120
    }
};

// ==========================================
// DATA & CONSTANTS
// ==========================================

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

const EARLY_DETECTION_B1_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_shortness_breath",
    "org.cphc.ncd.anm:id/radioGroup_coughing",
    "org.cphc.ncd.anm:id/radioGroup_blood_sputum",
    "org.cphc.ncd.anm:id/radioGroup_fever_week",
    "org.cphc.ncd.anm:id/radioGroup_weight_loss",
    "org.cphc.ncd.anm:id/radioGroup_night_sweats",
    "org.cphc.ncd.anm:id/radioGroup_anti_TB",
    "org.cphc.ncd.anm:id/radioGroup_suffering_from_TB",
    "org.cphc.ncd.anm:id/radioGroup_history_TB",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_ulceration",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_tingling",
    "org.cphc.ncd.anm:id/radioGroup_blurred_vision",
    "org.cphc.ncd.anm:id/radioGroup_reading_difficulty",
    "org.cphc.ncd.anm:id/radioGroup_pain_in_eye",
    "org.cphc.ncd.anm:id/radioGroup_redness_in_eye",
    "org.cphc.ncd.anm:id/radioGroup_difficulty_hearing",
    "org.cphc.ncd.anm:id/radioGroup_history_fits",
    "org.cphc.ncd.anm:id/radioGroup_difficulty_in_opening_mouth",
    "org.cphc.ncd.anm:id/radioGroup_ulcer_in_mouth",
    "org.cphc.ncd.anm:id/radioGroup_growth_in_mouth",
    "org.cphc.ncd.anm:id/radioGroup_white_red_patch_mouth",
    "org.cphc.ncd.anm:id/radioGroup_pain_while_chewing",
    "org.cphc.ncd.anm:id/radioGroup_voice_tone_change",
    "org.cphc.ncd.anm:id/radioGroup_hypo_pigmented_patch",
    "org.cphc.ncd.anm:id/radioGroup_thickened_skin",
    "org.cphc.ncd.anm:id/radioGroup_noduless_skin",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_numbness_palm",
    "org.cphc.ncd.anm:id/radioGroup_clawing_finger",
    "org.cphc.ncd.anm:id/radioGroup_tingling_numbness",
    "org.cphc.ncd.anm:id/radioGroup_inability_eyelid",
    "org.cphc.ncd.anm:id/radioGroup_difficult_holding_object",
    "org.cphc.ncd.anm:id/radioGroup_difficult_walking"
];

const FUEL_OPTIONS_TO_SELECT = ["Firewood", "LPG"];

const COPD_OCCUPATIONAL_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_crop_residue_burning",
    "org.cphc.ncd.anm:id/radioGroup_burning_garbage",
    "org.cphc.ncd.anm:id/radioGroup_working_industry"
];

// ==========================================
// SHARED HELPERS
// ==========================================

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

async function scrollToId(driver, resourceId) {
    return await driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${resourceId}"))`
    );
}

async function scrollToTextContains(driver, text) {
    return await driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`
    );
}

async function swipeDown(driver) {
    const { width, height } = await driver.getWindowRect();
    await driver.execute('mobile: scrollGesture', {
        left: Math.floor(width * 0.1),
        top: Math.floor(height * 0.3),
        width: Math.floor(width * 0.8),
        height: Math.floor(height * 0.5),
        direction: 'down',
        percent: 0.65
    });
    await driver.pause(350);
}

async function scrollDownToElement(driver, selector, maxSwipes = 10) {
    for (let i = 0; i < maxSwipes; i++) {
        const el = await driver.$(selector);
        if (await el.isDisplayed().catch(() => false)) {
            return el;
        }
        await swipeDown(driver);
    }
    throw new Error(`Element not visible after scrolling down: ${selector}`);
}

async function selectSecondRadioInGroup(driver, radioGroupId) {
    const noRadioSelector =
        `android=new UiSelector().resourceId("${radioGroupId}")` +
        `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

    const noRadio = await scrollDownToElement(driver, noRadioSelector);
    await noRadio.click();
}

async function selectSpinnerOption(driver, spinnerResourceId, optionText) {
    const spinner = await scrollDownToElement(
        driver,
        `android=new UiSelector().resourceId("${spinnerResourceId}")`
    );
    await spinner.click();

    const dropdownList = await driver.$('android=new UiSelector().className("android.widget.ListView")');
    await dropdownList.waitForDisplayed({ timeout: 5000 });

    const option = await driver.$(
        `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${optionText}")`
    );
    await option.waitForDisplayed({ timeout: 5000 });
    await option.click();

    await dropdownList.waitForDisplayed({ timeout: 5000, reverse: true });
    await driver.pause(300);
}

// ==========================================
// FLOW 0: INDIVIDUAL ENROLLMENT
// ==========================================

async function fillIndividualEnrollment(driver) {
    console.log("=== Starting Individual Enrollment ===");

    // 1. Enrollment Date
    const dateField = await scrollToId(driver, "org.cphc.ncd.anm:id/edit_text_enrollment_form_date");
    await dateField.waitForDisplayed({ timeout: 5000 });
    await dateField.click();
    await driver.pause(800);

    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    await okButton.waitForDisplayed({ timeout: 5000 });
    await okButton.click();
    await driver.pause(500);
    console.log("Enrollment date confirmed!");

    // 2. Village Dropdown
    const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
    await villageSpinner.waitForDisplayed({ timeout: 5000 });
    await villageSpinner.click();
    await driver.pause(800);

    const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
    await villageOption.waitForDisplayed({ timeout: 5000 });
    await villageOption.click();
    await driver.pause(500);
    console.log("Village selected!");

    // 3. Name & Gender
    const isMale = Math.random() < 0.5;
    const selectedName = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);

    const nameInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_name");
    await nameInput.waitForDisplayed({ timeout: 5000 });
    await nameInput.setValue(selectedName);

    const genderId = isMale
        ? "org.cphc.ncd.anm:id/enrolment_gender_male"
        : "org.cphc.ncd.anm:id/enrolment_gender_female";
    const genderRadio = await scrollToId(driver, genderId);
    await genderRadio.click();

    // 4. DOB & Age
    const { formattedDOB, age } = generateRandomDOB();
    const dobInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_dob");
    await dobInput.waitForDisplayed({ timeout: 5000 });
    await dobInput.click();
    await dobInput.setValue(formattedDOB);

    const ageInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_approx_age");
    await ageInput.waitForDisplayed({ timeout: 5000 });
    await ageInput.setValue(String(age));
    console.log(`Generated: ${selectedName} | Gender: ${isMale ? 'Male' : 'Female'} | Age: ${age} | DOB: ${formattedDOB}`);

    // 5. Mobile Number
    const selectedMobile = getRandomItem(PHONE_NUMBERS);
    const mobileInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_mobile_number");
    await mobileInput.waitForDisplayed({ timeout: 5000 });
    await mobileInput.setValue(selectedMobile);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    // 6. Save & Confirm Popup
    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/image_button_quick_enrolment_save");
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();
    console.log("Save clicked, waiting for confirmation popup...");

    const successOkButton = await driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
    await successOkButton.waitForDisplayed({ timeout: 15000 });
    await successOkButton.click();
    await driver.pause(1000);
    console.log("=== Individual Enrollment Completed ===");
}

// ==========================================
// CBAC PART A: RISK ASSESSMENT
// ==========================================

async function fillCbacPartA(driver) {
    console.log("=== Starting CBAC Part A: Risk Assessment ===");

    // 1. Click CBAC tile on Screening Dashboard
    const cbacTile = await driver.$('android=new UiSelector().text("CBAC")');
    await cbacTile.waitForDisplayed({ timeout: 8000 });
    await cbacTile.click();

    // 2. Wait for CBAC screen & Entry Date field to appear at the top (do NOT scroll down first)
    // 2. Wait for CBAC Entry Date field and tap its exact screen coordinates
    const cbacDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/edit_text_cbac_entry_date")'
    );
    await cbacDateField.waitForDisplayed({ timeout: 10000 });

    const { x, y } = await cbacDateField.getLocation();
    const { width, height } = await cbacDateField.getSize();
    const centerX = Math.floor(x + width / 2);
    const centerY = Math.floor(y + height / 2);

    // Physical touch tap bypasses EditText clickable=false / focus interception
    await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    // If first tap only focused the EditText, tap once more to trigger the DatePicker dialog
    if (!(await okButton.waitForDisplayed({ timeout: 2500 }).catch(() => false))) {
        await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
        await okButton.waitForDisplayed({ timeout: 5000 });
    }

    await okButton.click();
    await okButton.waitForDisplayed({ timeout: 5000, reverse: true });
    console.log("CBAC date confirmed!");

    // 3. Expand Part A: Risk Assessment Accordion
    const riskAssessmentCover = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/expandable_risk_assessment")' +
        '.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))'
    );
    await riskAssessmentCover.click();
    await driver.pause(800);
    console.log("Part A: Risk Assessment expanded!");

    // 4. Smoke / Khaini -> "Never"
    const smokeSpinner = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type")'
    );
    await smokeSpinner.click();
    await driver.pause(500);
    const neverOption = await driver.$('android=new UiSelector().text("Never")');
    await neverOption.waitForDisplayed({ timeout: 5000 });
    await neverOption.click();
    await driver.pause(350);

    // 5. Consume Alcohol Daily -> "No"
    const alcoholNoRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_consume_alcohol_daily_no")'
    );
    await alcoholNoRadio.click();

    // 6. Waist Measurement -> "91-100 cm"
    await selectSpinnerOption(driver, "org.cphc.ncd.anm:id/spinner_waist_measurement_type", "91-100 cm");

    // 7. Physical Activity -> "Less than 150 minutes in a week"
    const physicalActivityLessRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_less_than_150_physical_activity")'
    );
    await physicalActivityLessRadio.click();

    // 8. Family History of Blood Pressure -> "No"
    const familyBpNoRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_family_history_blood_pressure_no")'
    );
    await familyBpNoRadio.click();

    console.log("=== CBAC Part A Completed ===");
}

// ==========================================
// CBAC PART B: EARLY DETECTION
// ==========================================

async function fillCbacPartB(driver) {
    console.log("=== Starting CBAC Part B: Early Detection ===");

    const earlyDetectionCover = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/expandable_early_detection")' +
        '.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))'
    );
    await earlyDetectionCover.click();

    const subTitle = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_view_early_detection_sub_title")'
    );
    await subTitle.waitForDisplayed({ timeout: 8000 });
    console.log("Part B: Early Detection expanded!");

    for (const groupId of EARLY_DETECTION_B1_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
        console.log(`Selected No for: ${groupId.split('/')[1]}`);
        await driver.pause(150);
    }

    console.log("=== CBAC Part B Completed ===");
}

// ==========================================
// CBAC PART C: RISK FACTORS FOR COPD
// ==========================================

async function fillCbacPartC(driver) {
    console.log("=== Starting CBAC Part C: Risk Factors for COPD ===");

    // 1. Expand Part C Accordion
    const partCCover = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/expandable_risk_factor")' +
        '.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))'
    );
    await partCCover.click();

    const childHeader = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_view_select_all_apply_sub_header")'
    );
    await childHeader.waitForDisplayed({ timeout: 8000 });
    console.log("Part C child section loaded!");

    // 2. Open Multi-Select Cooking Fuel Modal
    const fuelSpinner = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_fuel_type")'
    );
    await fuelSpinner.click();

    const modalList = await driver.$('android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")');
    await modalList.waitForDisplayed({ timeout: 8000 });

    const okButton = await driver.$('android=new UiSelector().resourceId("org.cphc.ncd.anm:id/mulit_spinner_ok")');
    await okButton.waitForDisplayed({ timeout: 5000 });

    for (const optionText of FUEL_OPTIONS_TO_SELECT) {
        const checkbox = await driver.$(
            `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")` +
            `.childSelector(new UiSelector().className("android.widget.LinearLayout")` +
            `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview").text("${optionText}"))` +
            `.fromParent(new UiSelector().resourceId("org.cphc.ncd.anm:id/checkbox1")))`
        );

        await checkbox.waitForDisplayed({ timeout: 5000 });
        const isChecked = await checkbox.getAttribute('checked');
        if (isChecked !== 'true') {
            await checkbox.click();
        }
        console.log(`Selected fuel option: ${optionText}`);
        await driver.pause(250);
    }

    await okButton.click();
    await modalList.waitForDisplayed({ timeout: 8000, reverse: true });
    console.log("Multi-select modal closed!");

    // 3. Occupational Exposure Questions -> "No"
    for (const groupId of COPD_OCCUPATIONAL_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
        console.log(`Selected No for: ${groupId.split('/')[1]}`);
        await driver.pause(200);
    }

    console.log("=== CBAC Part C Completed ===");
}

// ==========================================
// CBAC PART D: PHQ 2
// ==========================================

async function fillCbacPartD(driver) {
    console.log("=== Starting CBAC Part D: PHQ 2 ===");

    // 1. Expand Part D Accordion
    const phqCover = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/expandable_phq")' +
        '.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))'
    );
    await phqCover.click();

    const phqHeader = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_view_over_last_header")'
    );
    await phqHeader.waitForDisplayed({ timeout: 8000 });
    console.log("Part D: PHQ 2 section expanded!");

    // 2. Both PHQ-2 Dropdowns -> "Not at all"
    await selectSpinnerOption(driver, "org.cphc.ncd.anm:id/spinner_little_interest_name", "Not at all");
    console.log("Selected 'Not at all' for: Little interest or pleasure in doing things");

    await selectSpinnerOption(driver, "org.cphc.ncd.anm:id/spinner_feeling_down_name", "Not at all");
    console.log("Selected 'Not at all' for: Feeling down, depressed or hopeless");

    // 3. Click FINISH Button
    const finishButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/button_finish")'
    );
    await finishButton.click();
    console.log("=== CBAC Part D Completed & FINISH Clicked ===");
}

// ==========================================
// MASTER ORCHESTRATOR
// ==========================================

async function runFullEnrollmentAndCbac() {
    const driver = await remote(opts);

    try {
        // Normal Flow: Individual Enrollment
        await fillIndividualEnrollment(driver);

        // Sequential CBAC Flow: Part A -> Part B -> Part C -> Part D
        await fillCbacPartA(driver);
        await fillCbacPartB(driver);
        await fillCbacPartC(driver);
        await fillCbacPartD(driver);

        console.log("ALL SECTIONS COMPLETED SUCCESSFULLY!");
    } catch (error) {
        console.error("Automation flow failed:", error);
    } finally {
        await driver.deleteSession();
    }
}

if (require.main === module) {
    runFullEnrollmentAndCbac();
}

module.exports = {
    fillIndividualEnrollment,
    fillCbacPartA,
    fillCbacPartB,
    fillCbacPartC,
    fillCbacPartD,
    runFullEnrollmentAndCbac
};