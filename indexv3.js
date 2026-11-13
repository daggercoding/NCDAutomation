const { remote } = require('webdriverio');

// ============================================================================
// CENTRALIZED MINIMUM-TIME SPEED CONFIGURATION (TUNE ALL DELAYS FROM HERE)
// ============================================================================
const SPEED_CONFIG = {
    waitForIdleTimeout: 10,     // Minimum safe UI idle check (0 = zero wait, 10–30 = safe fast)
    swipeSpeed: 4500,           // Scroll speed in px/sec (3000–6000)
    postSwipeDelay: 50,         // ms to let screen frame settle after swipe
    stepDelay: 0,               // ms optional breather between actions
    elementTimeout: 5000        // ms max wait before failing if an element never renders
};

// ============================================================================
// APPIUM & WEBDRIVERIO CONFIGURATION
// ============================================================================
const opts = {
    path: '/',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'AndroidDevice',
        'appium:noReset': true,
        'appium:dontStopAppOnReset': true,
        'appium:disableWindowAnimation': true,
        'appium:skipServerInstallation': true,
        'appium:skipDeviceInitialization': true,
        // NOTE: Kept false so nested FrameLayout accordion headers (cover/frame_parent) are never stripped
        'appium:ignoreUnimportantViews': false,
        'appium:settings[waitForIdleTimeout]': SPEED_CONFIG.waitForIdleTimeout,
        'appium:settings[actionAcknowledgmentTimeout]': 50,
        'appium:newCommandTimeout': 120
    }
};

// ============================================================================
// STEP TOGGLES FOR FAST DEBUGGING (Set completed sections to false)
// ============================================================================
const FLOW_STEPS = {
    runEnrollment: false,   // Section 0: Individual Enrollment
    runCbacPartA: true,     // Section 1: CBAC Part A - Risk Assessment
    runCbacPartB: true,     // Section 2: CBAC Part B - Early Detection (+ Women Only)
    runCbacPartC: true,     // Section 3: CBAC Part C - Risk Factors for COPD
    runCbacPartD: true      // Section 4: CBAC Part D - PHQ 2 & Finish
};

// ============================================================================
// STATIC TEST DATA & ELEMENT CONSTANTS
// ============================================================================
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

const EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_menopause",
    "org.cphc.ncd.anm:id/radioGroup_stained_discharge",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_after_intercourse",
    "org.cphc.ncd.anm:id/radioGroup_shape_size_breast",
    "org.cphc.ncd.anm:id/radioGroup_foul_smelling_discharge",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_between_period"
];

const FUEL_OPTIONS_TO_SELECT = ["Firewood", "LPG"];

const COPD_OCCUPATIONAL_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_crop_residue_burning",
    "org.cphc.ncd.anm:id/radioGroup_burning_garbage",
    "org.cphc.ncd.anm:id/radioGroup_working_industry"
];

// ============================================================================
// UTILITY & GESTURE HELPERS
// ============================================================================

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomDOB() {
    const currentYear = new Date().getFullYear();
    const randomAge = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
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

/**
 * Fast downward swipe controlled by SPEED_CONFIG without resetting to the top.
 */
async function swipeDown(driver) {
    const { width, height } = await driver.getWindowRect();
    await driver.execute('mobile: scrollGesture', {
        left: Math.floor(width * 0.1),
        top: Math.floor(height * 0.25),
        width: Math.floor(width * 0.8),
        height: Math.floor(height * 0.6),
        direction: 'down',
        percent: 0.70,
        speed: SPEED_CONFIG.swipeSpeed
    });
    if (SPEED_CONFIG.postSwipeDelay > 0) {
        await driver.pause(SPEED_CONFIG.postSwipeDelay);
    }
}

/**
 * Incrementally scrolls downward until an element matching `selector` is displayed.
 */
async function scrollDownToElement(driver, selector, maxSwipes = 12) {
    for (let i = 0; i < maxSwipes; i++) {
        const el = await driver.$(selector);
        if (await el.isDisplayed().catch(() => false)) {
            return el;
        }
        await swipeDown(driver);
    }
    throw new Error(`Element not visible after scrolling down: ${selector}`);
}

/**
 * Expands an accordion card by scrolling to its container ID, tapping its header/cover,
 * and scrolling down if needed until `expectedChildId` inside the expanded body is displayed.
 */
async function expandAccordionAndWaitForChild(driver, expandableId, expectedChildId) {
    const coverSelector =
        `android=new UiSelector().resourceId("${expandableId}")` +
        `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))`;

    const coverEl = await scrollDownToElement(driver, coverSelector);
    await coverEl.click();

    const childSelector = `android=new UiSelector().resourceId("${expectedChildId}")`;
    const childEl = await scrollDownToElement(driver, childSelector, 4);
    await childEl.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
}

/**
 * Scrolls to a RadioGroup and clicks its 2nd RadioButton ("No") ONLY if not already checked.
 */
async function selectSecondRadioInGroup(driver, radioGroupId) {
    const noRadioSelector =
        `android=new UiSelector().resourceId("${radioGroupId}")` +
        `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

    const noRadio = await scrollDownToElement(driver, noRadioSelector);
    const isAlreadyChecked = await noRadio.getAttribute('checked');

    if (isAlreadyChecked !== 'true') {
        await noRadio.click();
    }
}

/**
 * Opens a standard Android Spinner, waits for its ListView popup,
 * selects matching text (with optional fallback), and waits for the popup to close.
 */
async function selectSpinnerOption(driver, spinnerResourceId, primaryText, fallbackText = null) {
    const spinner = await scrollDownToElement(
        driver,
        `android=new UiSelector().resourceId("${spinnerResourceId}")`
    );
    await spinner.click();

    const dropdownList = await driver.$('android=new UiSelector().className("android.widget.ListView")');
    await dropdownList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    let option = await driver.$(
        `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${primaryText}")`
    );

    if (!(await option.isDisplayed().catch(() => false)) && fallbackText) {
        option = await driver.$(
            `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${fallbackText}")`
        );
    }

    await option.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await option.click();

    await dropdownList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
}

/**
 * Checks if the multi-select spinner already displays the exact target text on screen.
 * If not, opens the modal, checks ONLY unchecked target options (never unchecking existing ones),
 * and clicks mulit_spinner_ok.
 */
async function selectCustomMultiSpinnerOptions(driver, spinnerResourceId, optionsList, expectedDisplayText = null) {
    const spinner = await scrollDownToElement(
        driver,
        `android=new UiSelector().resourceId("${spinnerResourceId}")`
    );

    // 1. Fast pre-check: Inspect the TextView inside the Spinner before opening the modal
    const targetDisplay = expectedDisplayText || optionsList.join(', ');
    const spinnerTextEl = await spinner.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview")'
    );

    if (await spinnerTextEl.isDisplayed().catch(() => false)) {
        const currentText = (await spinnerTextEl.getText()).trim();
        if (currentText === targetDisplay) {
            console.log(`Skipping ${spinnerResourceId.split('/')[1]} — already set to "${currentText}"`);
            return;
        }
    }

    // 2. Open the multi-select modal if current text does not match
    await spinner.click();

    const modalList = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")'
    );
    await modalList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const okButton = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/mulit_spinner_ok")'
    );
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    // 3. Click ONLY checkboxes where checked !== 'true' so already-selected options stay checked
    for (const optionText of optionsList) {
        const checkbox = await driver.$(
            `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")` +
            `.childSelector(new UiSelector().className("android.widget.LinearLayout")` +
            `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview").text("${optionText}"))` +
            `.fromParent(new UiSelector().resourceId("org.cphc.ncd.anm:id/checkbox1")))`
        );

        await checkbox.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
        const isChecked = await checkbox.getAttribute('checked');

        if (isChecked !== 'true') {
            await checkbox.click();
            console.log(`Checked multi-option: ${optionText}`);
        } else {
            console.log(`Already checked (kept): ${optionText}`);
        }
    }

    await okButton.click();
    await modalList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
}

// ============================================================================
// SECTION 0: INDIVIDUAL ENROLLMENT (NORMAL FLOW)
// ============================================================================
async function fillIndividualEnrollment(driver) {
    console.log("=== [Section 0] Starting Individual Enrollment ===");

    const dateField = await scrollToId(driver, "org.cphc.ncd.anm:id/edit_text_enrollment_form_date");
    await dateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await dateField.click();

    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await okButton.click();
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
    console.log("Enrollment date confirmed!");

    const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
    await villageSpinner.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await villageSpinner.click();

    const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
    await villageOption.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await villageOption.click();
    console.log("Village selected!");

    const isMale = Math.random() < 0.5;
    const selectedName = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);

    const nameInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_name");
    await nameInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await nameInput.setValue(selectedName);

    const genderRadioId = isMale
        ? "org.cphc.ncd.anm:id/enrolment_gender_male"
        : "org.cphc.ncd.anm:id/enrolment_gender_female";
    const genderRadio = await scrollToId(driver, genderRadioId);
    await genderRadio.click();

    const { formattedDOB, age } = generateRandomDOB();
    const dobInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_dob");
    await dobInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await dobInput.click();
    await dobInput.setValue(formattedDOB);

    const ageInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_approx_age");
    await ageInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await ageInput.setValue(String(age));
    console.log(`Generated: ${selectedName} | Gender: ${isMale ? 'Male' : 'Female'} | Age: ${age} | DOB: ${formattedDOB}`);

    const selectedMobile = getRandomItem(PHONE_NUMBERS);
    const mobileInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_mobile_number");
    await mobileInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await mobileInput.setValue(selectedMobile);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/image_button_quick_enrolment_save");
    await saveButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await saveButton.click();
    console.log("Save clicked, waiting for confirmation popup...");

    const successOkButton = await driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
    await successOkButton.waitForDisplayed({ timeout: 15000 });
    await successOkButton.click();
    await successOkButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
    console.log("=== [Section 0] Individual Enrollment Completed ===\n");

    return { isMale };
}

// ============================================================================
// SECTION 1: CBAC PART A - RISK ASSESSMENT
// ============================================================================
async function fillCbacPartA(driver, isMale = false) {
    console.log("=== [Part A] Starting CBAC: Risk Assessment ===");

    const cbacTileContainer = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_general_registraion")'
    );
    if (await cbacTileContainer.isDisplayed().catch(() => false)) {
        await cbacTileContainer.click();
    }

    const cbacDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/edit_text_cbac_entry_date")'
    );
    await cbacDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const { x, y } = await cbacDateField.getLocation();
    const { width, height } = await cbacDateField.getSize();
    const centerX = Math.floor(x + width / 2);
    const centerY = Math.floor(y + height / 2);

    await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
        await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
        await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    }

    await okButton.click();
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
    console.log("CBAC entry date confirmed!");

    // Mandatory Multi-Select: "Does this person have" -> "None" (skips if already "None")
    await selectCustomMultiSpinnerOptions(
        driver,
        "org.cphc.ncd.anm:id/spinner_does_this_person_have",
        ["None"],
        "None"
    );

    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_risk_assessment",
        "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type"
    );
    console.log("Part A: Risk Assessment accordion expanded!");

    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type",
        "Never"
    );

    const alcoholNoRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_consume_alcohol_daily_no")'
    );
    if ((await alcoholNoRadio.getAttribute('checked')) !== 'true') {
        await alcoholNoRadio.click();
    }

    const primaryWaist = isMale ? "91-100 cm" : "81-90 cm";
    const fallbackWaist = isMale ? "81-90 cm" : "91-100 cm";
    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_waist_measurement_type",
        primaryWaist,
        fallbackWaist
    );

    const physicalActivityLessRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_less_than_150_physical_activity")'
    );
    if ((await physicalActivityLessRadio.getAttribute('checked')) !== 'true') {
        await physicalActivityLessRadio.click();
    }

    const familyBpNoRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_family_history_blood_pressure_no")'
    );
    if ((await familyBpNoRadio.getAttribute('checked')) !== 'true') {
        await familyBpNoRadio.click();
    }

    console.log("=== [Part A] CBAC Risk Assessment Completed ===\n");
}

// ============================================================================
// SECTION 2: CBAC PART B - EARLY DETECTION (B1 + B2 WOMEN'S ONLY)
// ============================================================================
async function fillCbacPartB(driver) {
    console.log("=== [Part B] Starting CBAC: Early Detection ===");

    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_early_detection",
        "org.cphc.ncd.anm:id/text_view_early_detection_sub_title"
    );
    console.log("Part B: Early Detection accordion expanded!");

    // 1. B1: Women and Men -> Ensure "No" (2nd RadioButton) is selected for all questions
    for (const groupId of EARLY_DETECTION_B1_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
    }
    console.log("Part B1 (Women and Men) questions completed!");

    // 2. B2: Women Only Section (Always visible in layout, disabled for Men)
    const firstWomensRadioSelector =
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast")' +
        '.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))';

    const firstWomensRadio = await scrollDownToElement(driver, firstWomensRadioSelector);

    if (await firstWomensRadio.isEnabled().catch(() => false)) {
        console.log("B2: Women-only radio buttons are enabled — ensuring 'No' for all 7 options...");

        if ((await firstWomensRadio.getAttribute('checked')) !== 'true') {
            await firstWomensRadio.click();
        }

        for (let i = 1; i < EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS.length; i++) {
            await selectSecondRadioInGroup(driver, EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS[i]);
        }
        console.log("B2: Women-only questions completed!");
    } else {
        console.log("B2: Women-only radio buttons are disabled (Male patient) — skipping.");
    }

    console.log("=== [Part B] CBAC Early Detection Completed ===\n");
}

// ============================================================================
// SECTION 3: CBAC PART C - RISK FACTORS FOR COPD
// ============================================================================
async function fillCbacPartC(driver) {
    console.log("=== [Part C] Starting CBAC: Risk Factors for COPD ===");

    // 1. Expand Part C Accordion and scroll into its body if opened near bottom edge
    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_risk_factor",
        "org.cphc.ncd.anm:id/multi_spinner_fuel_type"
    );
    console.log("Part C: Risk Factors for COPD accordion expanded!");

    // 2. Multi-Select Cooking Fuel: "Firewood" & "LPG" (skips if already set, never unchecks valid boxes)
    await selectCustomMultiSpinnerOptions(
        driver,
        "org.cphc.ncd.anm:id/multi_spinner_fuel_type",
        FUEL_OPTIONS_TO_SELECT,
        "Firewood, LPG"
    );
    console.log("Cooking fuel selection completed!");

    // 3. Answer all 3 Occupational Exposure questions with "No"
    for (const groupId of COPD_OCCUPATIONAL_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
    }

    console.log("=== [Part C] CBAC Risk Factors for COPD Completed ===\n");
}

// ============================================================================
// SECTION 4: CBAC PART D - PHQ 2 & FINISH
// ============================================================================
async function fillCbacPartD(driver) {
    console.log("=== [Part D] Starting CBAC: PHQ 2 ===");

    // 1. Expand Part D Accordion and scroll into its body if opened near bottom edge
    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_phq",
        "org.cphc.ncd.anm:id/spinner_little_interest_name"
    );
    console.log("Part D: PHQ 2 accordion expanded!");

    // 2. First PHQ-2 Dropdown -> "Not at all"
    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_little_interest_name",
        "Not at all"
    );

    // 3. Second PHQ-2 Dropdown -> "Not at all"
    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_feeling_down_name",
        "Not at all"
    );

    // 4. Scroll down to FINISH button and submit CBAC
    const finishButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/button_finish")'
    );
    await finishButton.click();
    console.log("=== [Part D] CBAC PHQ 2 Completed & FINISH Clicked ===\n");
}

// ============================================================================
// MASTER FLOW ORCHESTRATOR
// ============================================================================
async function runCompleteAutomationFlow() {
    const driver = await remote(opts);
    let enrolledGenderIsMale = false;

    try {
        if (FLOW_STEPS.runEnrollment) {
            const enrollmentResult = await fillIndividualEnrollment(driver);
            enrolledGenderIsMale = enrollmentResult.isMale;
        }

        if (FLOW_STEPS.runCbacPartA) {
            await fillCbacPartA(driver, enrolledGenderIsMale);
        }

        if (FLOW_STEPS.runCbacPartB) {
            await fillCbacPartB(driver);
        }

        if (FLOW_STEPS.runCbacPartC) {
            await fillCbacPartC(driver);
        }

        if (FLOW_STEPS.runCbacPartD) {
            await fillCbacPartD(driver);
        }

        console.log("ENABLED SECTIONS COMPLETED SUCCESSFULLY!");
    } catch (error) {
        console.error("Automation flow encountered an error:", error);
    } finally {
        await driver.deleteSession();
    }
}

if (require.main === module) {
    runCompleteAutomationFlow();
}

module.exports = {
    fillIndividualEnrollment,
    fillCbacPartA,
    fillCbacPartB,
    fillCbacPartC,
    fillCbacPartD,
    runCompleteAutomationFlow
};