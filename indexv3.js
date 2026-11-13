// const { remote } = require('webdriverio');

// // ============================================================================
// // CENTRALIZED MINIMUM-TIME SPEED CONFIGURATION (TUNE ALL DELAYS FROM HERE)
// // ============================================================================
// const SPEED_CONFIG = {
//     waitForIdleTimeout: 10,     // Minimum safe UI idle check (0 = zero wait, 10–30 = safe fast)
//     swipeSpeed: 4500,           // Scroll speed in px/sec (3000–6000)
//     postSwipeDelay: 50,         // ms to let screen frame settle after swipe
//     stepDelay: 0,               // ms optional breather between actions
//     elementTimeout: 5000        // ms max wait before failing if an element never renders
// };

// // ============================================================================
// // APPIUM & WEBDRIVERIO CONFIGURATION
// // ============================================================================
// const opts = {
//     path: '/',
//     port: 4723,
//     capabilities: {
//         platformName: 'Android',
//         'appium:automationName': 'UiAutomator2',
//         'appium:deviceName': 'AndroidDevice',
//         'appium:noReset': true,
//         'appium:dontStopAppOnReset': true,
//         'appium:disableWindowAnimation': true,
//         'appium:skipServerInstallation': true,
//         'appium:skipDeviceInitialization': true,
//         // NOTE: Kept false so nested FrameLayout accordion headers (cover/frame_parent) are never stripped
//         'appium:ignoreUnimportantViews': false,
//         'appium:settings[waitForIdleTimeout]': SPEED_CONFIG.waitForIdleTimeout,
//         'appium:settings[actionAcknowledgmentTimeout]': 50,
//         'appium:newCommandTimeout': 120
//     }
// };

// // ============================================================================
// // STEP TOGGLES FOR FAST DEBUGGING (Set completed sections to false)
// // ============================================================================
// const FLOW_STEPS = {
//     runEnrollment: true,            // Section 0: Individual Enrollment
//     runCbacPartA: true,             // Section 1: CBAC Part A - Risk Assessment
//     runCbacPartB: true,             // Section 2: CBAC Part B - Early Detection (+ Women Only)
//     runCbacPartC: true,             // Section 3: CBAC Part C - Risk Factors for COPD
//     runCbacPartD: true,             // Section 4: CBAC Part D - PHQ 2 & Finish
//     runPersonalExam: true,          // Section 5: Personal Examination
//     runPersonalHistory: true,       // Section 6: Personal History
//     runHypertensionScreening: true, // Section 7: Hypertension Screening
//     runDiabetesScreening: true,      // Section 8: Diabetes Screening
//     runOralScreening: true           // Section 9: Oral Screening
// };

// // ============================================================================
// // STATIC TEST DATA & ELEMENT CONSTANTS
// // ============================================================================
// const MALE_NAMES = [
//     // 1-25
//     "Rajesh Kumar", "Amit Sharma", "Sanjay Singh", "Vijay Verma", "Manoj Yadav",
//     "Sunil Patel", "Ramesh Prasad", "Dharmendra Kumar", "Pankaj Das", "Anil Gupta",
//     "Ravi Shankar", "Deepak Kumar", "Suresh Sahni", "Vikas Pandit", "Rakesh Mishra",
//     "Alok Ranjan", "Mukesh Kumar", "Santosh Roy", "Ajay Malhotra", "Pravin Kumar",
//     "Bikram Singh", "Dinesh Chandra", "Ashok Kumar", "Gaurav Srivastava", "Manish Pandey",

//     // 26-50
//     "Ram Kishor", "Mahendra Mahato", "Hari Om", "Shyam Lal", "Basant Paswan",
//     "Subhash Rajbhar", "Devendra Pal", "Satish Bind", "Lallan Chaurasiya", "Ganesh Mahto",
//     "Jagdish Prasad", "Narendra Dev", "Vinod Thakur", "Arun Maurya", "Kameshwar Roy",
//     "Babulal Sharma", "Pramod Patel", "Gautam Chauhan", "Surendra Yadav", "Shambhu Nath",
//     "Maheshwar Singh", "Phool Chand", "Kailash Giri", "Umesh Chandra", "Sitaram Nishad",

//     // 51-75
//     "Satyendra Kumar", "Jitendra Bhagat", "Bhola Ram", "Radhey Shyam", "Badri Prasad",
//     "Kishore Mandal", "Rajendra Singh", "Nand Lal", "Ram Lakhan", "Shriniwas Pandit",
//     "Ramswaroop Pal", "Mithilesh Prasad", "Tribhuvan Nath", "Dukhi Ram", "Bharat Mahato",
//     "Ramlallu Verma", "Awadhesh Prasad", "Ganga Sah", "Suraj Bhan", "Hariram Maurya",
//     "Balram Singh", "Janardan Sahni", "Parameshwar Paswan", "Chhedi Lal", "Brijesh Gautam",

//     // 76-100
//     "Bhairav Singh", "Daya Shankar", "Maniram Yadav", "Shiv Pujan", "Kishan Lal",
//     "Girija Shankar", "Chhote Lal", "Sukhdev Giri", "Rambriksh Roy", "Paras Nath",
//     "Nageshwar Mahato", "Raghuveer Singh", "Kalu Ram", "Sohan Lal", "Jagat Pal",
//     "Shiv Shankar", "Dhananjay Prasad", "Beni Prasad", "Bhagwan Das", "Rajdev Bind",
//     "Surya Bhan", "Kedar Nath", "Moti Lal", "Lal Bahadur", "Dinabandhu Sahu",

//     // 101-125
//     "Amresh Chandra", "Jugal Kishor", "Ram Naresh", "Shambhu Saran", "Kamleshwar Roy",
//     "Bhagwati Prasad", "Nirmal Mahato", "Doodhnath Singh", "Lakhpat Ram", "Tej Bahadur",
//     "Ram Sharan", "Subedar Pal", "Rajaram Maurya", "Dukharan Das", "Ghanaram Sahu",
//     "Bhole Shankar", "Mangal Dev", "Vidyadhar Pandit", "Kishuni Ram", "Lala Ram",
//     "Sukhram Yadav", "Shiv Charan", "Tirath Nath", "Harihar Prasad", "Deep Chand",

//     // 126-150
//     "Hira Lal", "Prem Chand", "Mahabir Singh", "Shiv Shambhu", "Babu Ram",
//     "Nanku Ram", "Somaru Bhagat", "Raghunath Mahato", "Janki Prasad", "Prabhu Nath",
//     "Devraj Pal", "Dharam Pal", "Balkishan Sharma", "Gopichand Sah", "Sundar Lal",
//     "Ram Vilas", "Kameshwar Singh", "Gaurishankar Roy", "Narayan Das", "Shripat Ram",
//     "Bhola Nath", "Ram Chander", "Hardev Giri", "Rupchand Patel", "Madan Mohan",

//     // 151-175
//     "Parvati Nandan", "Ram Kumar", "Kripa Shankar", "Sheo Prasad", "Ganga Ram",
//     "Sadhu Saran", "Baliram Yadav", "Lakhan Lal", "Vaidyanath Mahato", "Badri Sah",
//     "Bindeshwar Roy", "Ramashray Singh", "Chandra Bhan", "Beni Ram", "Shankar Das",
//     "Nathuni Ram", "Dukhi Sahu", "Jagannath Prasad", "Ghanashyam Pal", "Binda Din",
//     "Ram Asrey", "Sitaram Bhagat", "Paras Ram", "Vishwa Nath", "Suraj Ram",

//     // 176-200
//     "Ram Briksh", "Mahadev Prasad", "Sheopujan Singh", "Hari Ram", "Lalta Prasad",
//     "Devi Sharan", "Jagan Lal", "Babulal Sahu", "Nand Kishor", "Kailash Nath",
//     "Somnath Giri", "Dhanpat Ram", "Ganga Saran", "Jagdev Prasad", "Kanhaiya Lal",
//     "Shiv Prasad", "Ram Balak", "Radhe Mohan", "Brij Lal", "Munna Lal",
//     "Suraj Deo", "Shriram Pal", "Subhash Chandra", "Kishan Chand", "Ram Bahadur"
// ];

// const FEMALE_NAMES = [
//     // 1-25 (Reference Batch)
//     "Sunita Devi", "Anita Sharma", "Pooja Devi", "Rekha Kumari", "Manju Devi",
//     "Suman Lata", "Kiran Devi", "Geeta Sharma", "Seema Kumari", "Asha Devi",
//     "Usha Devi", "Meena Kumari", "Rita Devi", "Sangita Sharma", "Shanti Devi",
//     "Kavita Kumari", "Sarita Devi", "Rinku Devi", "Mamta Kumari", "Priyanka Sharma",
//     "Shobha Devi", "Bina Devi", "Sushila Devi", "Nirmala Kumari", "Poonam Devi",

//     // 26-50
//     "Phoolmati Devi", "Basanti Devi", "Ramvati Kumari", "Munni Devi", "Phoolwa Devi",
//     "Kusum Lata", "Kanti Devi", "Savitri Devi", "Kaushalya Devi", "Parvati Devi",
//     "Durga Kumari", "Ganga Devi", "Bhagwati Devi", "Lakshminia Devi", "Sheela Kumari",
//     "Janki Devi", "Anarkali Devi", "Guddi Kumari", "Lalita Devi", "Kamla Devi",
//     "Radha Devi", "Premwati Kumari", "Vidya Devi", "Kalawati Devi", "Raj Kumari",

//     // 51-75
//     "Champa Devi", "Dropadi Devi", "Indu Kumari", "Bachhi Devi", "Kunti Devi",
//     "Saraswati Devi", "Tara Devi", "Chameli Devi", "Chandrawati Kumari", "Lilawati Devi",
//     "Premila Devi", "Subhadra Devi", "Kewala Devi", "Badami Devi", "Shakuntala Kumari",
//     "Bimla Devi", "Malti Devi", "Gayatri Devi", "Santoshi Kumari", "Sonmati Devi",
//     "Sharda Devi", "Maya Devi", "Pushpa Kumari", "Kailashi Devi", "Dhanwanti Devi",

//     // 76-100
//     "Chinta Devi", "Dukhni Devi", "Gyanmati Kumari", "Shanti Lata", "Prabhavati Devi",
//     "Sita Devi", "Sita Kumari", "Bhanumati Devi", "Devki Kumari", "Rani Devi",
//     "Suman Devi", "Neelam Kumari", "Chanderwati Devi", "Manorama Devi", "Binda Devi",
//     "Rajpati Devi", "Savitri Kumari", "Kamlesh Devi", "Gulabi Devi", "Ram rati Devi",
//     "Jhagru Devi", "Sugiya Devi", "Girija Devi", "Brijlata Devi", "Nandrani Devi",

//     // 101-125
//     "Dhanraji Devi", "Rambha Devi", "Vidyawati Kumari", "Kalyani Devi", "Mina Devi",
//     "Basheera Devi", "Anandi Devi", "Sumitra Devi", "Shanti Sharma", "Gita Kumari",
//     "Sarda Devi", "Phool Kumari", "Ramkuwari Devi", "Kaushilya Kumari", "Sudama Devi",
//     "Vimala Devi", "Mateshwari Devi", "Pari Devi", "Parwati Kumari", "Muni Devi",
//     "Kushma Devi", "Rajwanti Devi", "Satya Devi", "Sulochana Kumari", "Maina Devi",

//     // 126-150
//     "Subhavati Devi", "Nirupa Devi", "Shyama Devi", "Kamlesh Kumari", "Shobhawati Devi",
//     "Taramati Devi", "Dulari Devi", "Jagatpati Devi", "Fulwa Kumari", "Kishori Devi",
//     "Ahilya Devi", "Sampati Devi", "Maheshwari Devi", "Durgawati Kumari", "Leela Devi",
//     "Muniya Devi", "Pyari Devi", "Manrakhan Devi", "Ramdulari Kumari", "Phoolan Devi",
//     "Nageshwari Devi", "Sunaina Devi", "Bindeshwari Devi", "Rajrani Kumari", "Gangi Devi",

//     // 151-175
//     "Chhoti Devi", "Fulmati Kumari", "Devanti Devi", "Shivkumari Devi", "Basumati Devi",
//     "Radhika Devi", "Rukhmani Devi", "Kamla Kumari", "Shrimati Devi", "Kalwa Devi",
//     "Lachhminia Devi", "Shriwanti Devi", "Bhagmania Devi", "Mateshwari Kumari", "Sonmani Devi",
//     "Sonam Kumari", "Janakdulari Devi", "Bachi Kumari", "Maharani Devi", "Phoolwa Kumari",
//     "Reshma Devi", "Guddi Devi", "Vidyanti Kumari", "Vidyawati Devi", "Sudha Devi",

//     // 176-200
//     "Devki Devi", "Bhagwati Kumari", "Ramkali Devi", "Chhoto Devi", "Rajmati Devi",
//     "Suryanti Devi", "Ramdevi Kumari", "Champa Kumari", "Nirmala Sharma", "Vimla Kumari",
//     "Nirbhay Devi", "Manju Kumari", "Sunita Sharma", "Sangita Devi", "Bachhi Kumari",
//     "Lilawati Kumari", "Prabhawati Kumari", "Suman Kumari", "Rekha Sharma", "Geeta Devi",
//     "Kamlawati Devi", "Shakuntala Devi", "Pushpa Devi", "Sarita Kumari", "Usha Sharma"
// ];

// const PHONE_NUMBERS = ["9955254569", "9661020391"];

// const EARLY_DETECTION_B1_RADIO_GROUPS = [
//     "org.cphc.ncd.anm:id/radioGroup_shortness_breath",
//     "org.cphc.ncd.anm:id/radioGroup_coughing",
//     "org.cphc.ncd.anm:id/radioGroup_blood_sputum",
//     "org.cphc.ncd.anm:id/radioGroup_fever_week",
//     "org.cphc.ncd.anm:id/radioGroup_weight_loss",
//     "org.cphc.ncd.anm:id/radioGroup_night_sweats",
//     "org.cphc.ncd.anm:id/radioGroup_anti_TB",
//     "org.cphc.ncd.anm:id/radioGroup_suffering_from_TB",
//     "org.cphc.ncd.anm:id/radioGroup_history_TB",
//     "org.cphc.ncd.anm:id/radioGroup_recurrent_ulceration",
//     "org.cphc.ncd.anm:id/radioGroup_recurrent_tingling",
//     "org.cphc.ncd.anm:id/radioGroup_blurred_vision",
//     "org.cphc.ncd.anm:id/radioGroup_reading_difficulty",
//     "org.cphc.ncd.anm:id/radioGroup_pain_in_eye",
//     "org.cphc.ncd.anm:id/radioGroup_redness_in_eye",
//     "org.cphc.ncd.anm:id/radioGroup_difficulty_hearing",
//     "org.cphc.ncd.anm:id/radioGroup_history_fits",
//     "org.cphc.ncd.anm:id/radioGroup_difficulty_in_opening_mouth",
//     "org.cphc.ncd.anm:id/radioGroup_ulcer_in_mouth",
//     "org.cphc.ncd.anm:id/radioGroup_growth_in_mouth",
//     "org.cphc.ncd.anm:id/radioGroup_white_red_patch_mouth",
//     "org.cphc.ncd.anm:id/radioGroup_pain_while_chewing",
//     "org.cphc.ncd.anm:id/radioGroup_voice_tone_change",
//     "org.cphc.ncd.anm:id/radioGroup_hypo_pigmented_patch",
//     "org.cphc.ncd.anm:id/radioGroup_thickened_skin",
//     "org.cphc.ncd.anm:id/radioGroup_noduless_skin",
//     "org.cphc.ncd.anm:id/radioGroup_recurrent_numbness_palm",
//     "org.cphc.ncd.anm:id/radioGroup_clawing_finger",
//     "org.cphc.ncd.anm:id/radioGroup_tingling_numbness",
//     "org.cphc.ncd.anm:id/radioGroup_inability_eyelid",
//     "org.cphc.ncd.anm:id/radioGroup_difficult_holding_object",
//     "org.cphc.ncd.anm:id/radioGroup_difficult_walking"
// ];

// const EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS = [
//     "org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast",
//     "org.cphc.ncd.anm:id/radioGroup_bleeding_menopause",
//     "org.cphc.ncd.anm:id/radioGroup_stained_discharge",
//     "org.cphc.ncd.anm:id/radioGroup_bleeding_after_intercourse",
//     "org.cphc.ncd.anm:id/radioGroup_shape_size_breast",
//     "org.cphc.ncd.anm:id/radioGroup_foul_smelling_discharge",
//     "org.cphc.ncd.anm:id/radioGroup_bleeding_between_period"
// ];

// const FUEL_OPTIONS_TO_SELECT = ["Firewood", "LPG"];

// const COPD_OCCUPATIONAL_RADIO_GROUPS = [
//     "org.cphc.ncd.anm:id/radioGroup_crop_residue_burning",
//     "org.cphc.ncd.anm:id/radioGroup_burning_garbage",
//     "org.cphc.ncd.anm:id/radioGroup_working_industry"
// ];

// const PERSONAL_HISTORY_NO_RADIOS = [
//     "org.cphc.ncd.anm:id/hypertension_no",
//     "org.cphc.ncd.anm:id/diabeties_no",
//     "org.cphc.ncd.anm:id/heart_disease_no",
//     "org.cphc.ncd.anm:id/stroke_no",
//     "org.cphc.ncd.anm:id/kidney_failure_no",
//     "org.cphc.ncd.anm:id/nonhealing_wound_no",
//     "org.cphc.ncd.anm:id/copd_no",
//     "org.cphc.ncd.anm:id/asthma_no",
//     "org.cphc.ncd.anm:id/oral_cancer_no",
//     "org.cphc.ncd.anm:id/other_no"
// ];

// const ORAL_EXAM_NO_RADIOS = [
//     "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_white_no",
//     "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_red_no",
//     "org.cphc.ncd.anm:id/radiobutton_oral_exam_ulcer_no",
//     "org.cphc.ncd.anm:id/radiogroup_oral_exam_growth_no",
//     "org.cphc.ncd.anm:id/radiogroup_oral_exam_lockedjaw_no"
// ];

// // ============================================================================
// // UTILITY & GESTURE HELPERS
// // ============================================================================

// function getRandomItem(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateRandomDOB() {
//     const currentYear = new Date().getFullYear();
//     const randomAge = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
//     const birthYear = currentYear - randomAge;

//     const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
//     const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

//     return {
//         formattedDOB: `${randomDay}-${randomMonth}-${birthYear}`,
//         age: randomAge
//     };
// }

// async function scrollToId(driver, resourceId) {
//     return await driver.$(
//         `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${resourceId}"))`
//     );
// }

// async function scrollToTextContains(driver, text) {
//     return await driver.$(
//         `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`
//     );
// }

// /**
//  * Fast downward swipe controlled by SPEED_CONFIG without resetting to the top.
//  */
// async function swipeDown(driver) {
//     const { width, height } = await driver.getWindowRect();
//     await driver.execute('mobile: scrollGesture', {
//         left: Math.floor(width * 0.1),
//         top: Math.floor(height * 0.25),
//         width: Math.floor(width * 0.8),
//         height: Math.floor(height * 0.6),
//         direction: 'down',
//         percent: 0.70,
//         speed: SPEED_CONFIG.swipeSpeed
//     });
//     if (SPEED_CONFIG.postSwipeDelay > 0) {
//         await driver.pause(SPEED_CONFIG.postSwipeDelay);
//     }
// }

// /**
//  * Incrementally scrolls downward until an element matching `selector` is displayed.
//  */
// async function scrollDownToElement(driver, selector, maxSwipes = 12) {
//     for (let i = 0; i < maxSwipes; i++) {
//         const el = await driver.$(selector);
//         if (await el.isDisplayed().catch(() => false)) {
//             return el;
//         }
//         await swipeDown(driver);
//     }
//     throw new Error(`Element not visible after scrolling down: ${selector}`);
// }

// /**
//  * Expands an accordion card by scrolling to its container ID, tapping its header/cover,
//  * and scrolling down if needed until `expectedChildId` inside the expanded body is displayed.
//  */
// async function expandAccordionAndWaitForChild(driver, expandableId, expectedChildId) {
//     const coverSelector =
//         `android=new UiSelector().resourceId("${expandableId}")` +
//         `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))`;

//     const coverEl = await scrollDownToElement(driver, coverSelector);
//     await coverEl.click();

//     const childSelector = `android=new UiSelector().resourceId("${expectedChildId}")`;
//     const childEl = await scrollDownToElement(driver, childSelector, 4);
//     await childEl.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
// }

// /**
//  * Scrolls to a RadioGroup and clicks its 2nd RadioButton ("No") ONLY if not already checked.
//  */
// async function selectSecondRadioInGroup(driver, radioGroupId) {
//     const noRadioSelector =
//         `android=new UiSelector().resourceId("${radioGroupId}")` +
//         `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

//     const noRadio = await scrollDownToElement(driver, noRadioSelector);
//     const isAlreadyChecked = await noRadio.getAttribute('checked');

//     if (isAlreadyChecked !== 'true') {
//         await noRadio.click();
//     }
// }

// /**
//  * Opens a standard Android Spinner, waits for its ListView popup,
//  * selects matching text (with optional fallback), and waits for the popup to close.
//  */
// async function selectSpinnerOption(driver, spinnerResourceId, primaryText, fallbackText = null) {
//     const spinner = await scrollDownToElement(
//         driver,
//         `android=new UiSelector().resourceId("${spinnerResourceId}")`
//     );
//     await spinner.click();

//     const dropdownList = await driver.$('android=new UiSelector().className("android.widget.ListView")');
//     await dropdownList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     let option = await driver.$(
//         `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${primaryText}")`
//     );

//     if (!(await option.isDisplayed().catch(() => false)) && fallbackText) {
//         option = await driver.$(
//             `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${fallbackText}")`
//         );
//     }

//     await option.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await option.click();

//     await dropdownList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
// }

// /**
//  * Checks if the multi-select spinner already displays the exact target text on screen.
//  * If not, opens the modal, checks ONLY unchecked target options (never unchecking existing ones),
//  * and clicks mulit_spinner_ok.
//  */
// async function selectCustomMultiSpinnerOptions(driver, spinnerResourceId, optionsList, expectedDisplayText = null) {
//     const spinner = await scrollDownToElement(
//         driver,
//         `android=new UiSelector().resourceId("${spinnerResourceId}")`
//     );

//     // 1. Fast pre-check: Inspect the TextView inside the Spinner before opening the modal
//     const targetDisplay = expectedDisplayText || optionsList.join(', ');
//     const spinnerTextEl = await spinner.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview")'
//     );

//     if (await spinnerTextEl.isDisplayed().catch(() => false)) {
//         const currentText = (await spinnerTextEl.getText()).trim();
//         if (currentText === targetDisplay) {
//             console.log(`Skipping ${spinnerResourceId.split('/')[1]} — already set to "${currentText}"`);
//             return;
//         }
//     }

//     // 2. Open the multi-select modal if current text does not match
//     await spinner.click();

//     const modalList = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")'
//     );
//     await modalList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const okButton = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/mulit_spinner_ok")'
//     );
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     // 3. Click ONLY checkboxes where checked !== 'true' so already-selected options stay checked
//     for (const optionText of optionsList) {
//         const checkbox = await driver.$(
//             `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")` +
//             `.childSelector(new UiSelector().className("android.widget.LinearLayout")` +
//             `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview").text("${optionText}"))` +
//             `.fromParent(new UiSelector().resourceId("org.cphc.ncd.anm:id/checkbox1")))`
//         );

//         await checkbox.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//         const isChecked = await checkbox.getAttribute('checked');

//         if (isChecked !== 'true') {
//             await checkbox.click();
//             console.log(`Checked multi-option: ${optionText}`);
//         } else {
//             console.log(`Already checked (kept): ${optionText}`);
//         }
//     }

//     await okButton.click();
//     await modalList.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
// }

// // ============================================================================
// // SECTION 0: INDIVIDUAL ENROLLMENT (NORMAL FLOW)
// // ============================================================================
// async function fillIndividualEnrollment(driver) {
//     console.log("=== [Section 0] Starting Individual Enrollment ===");

//     const dateField = await scrollToId(driver, "org.cphc.ncd.anm:id/edit_text_enrollment_form_date");
//     await dateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await dateField.click();

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("Enrollment date confirmed!");

//     const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
//     await villageSpinner.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await villageSpinner.click();

//     const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
//     await villageOption.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await villageOption.click();
//     console.log("Village selected!");

//     // const isMale = Math.random() < 0.5;
//     const isMale = true;
//     const selectedName = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);
    

//     const nameInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_name");
//     await nameInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await nameInput.setValue(selectedName);

//     const genderRadioId = isMale
//         ? "org.cphc.ncd.anm:id/enrolment_gender_male"
//         : "org.cphc.ncd.anm:id/enrolment_gender_female";
//     const genderRadio = await scrollToId(driver, genderRadioId);
//     await genderRadio.click();

//     const { formattedDOB, age } = generateRandomDOB();
//     const dobInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_dob");
//     await dobInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await dobInput.click();
//     await dobInput.setValue(formattedDOB);

//     const ageInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_approx_age");
//     await ageInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await ageInput.setValue(String(age));
//     console.log(`Generated: ${selectedName} | Gender: ${isMale ? 'Male' : 'Female'} | Age: ${age} | DOB: ${formattedDOB}`);

//     const selectedMobile = getRandomItem(PHONE_NUMBERS);
//     const mobileInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_mobile_number");
//     await mobileInput.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await mobileInput.setValue(selectedMobile);

//     try {
//         await driver.hideKeyboard();
//     } catch (e) {}

//     const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/image_button_quick_enrolment_save");
//     await saveButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await saveButton.click();
//     console.log("Save clicked, waiting for confirmation popup...");

//     const successOkButton = await driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
//     await successOkButton.waitForDisplayed({ timeout: 15000 });
//     await successOkButton.click();
//     await successOkButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("=== [Section 0] Individual Enrollment Completed ===\n");

//     return { isMale };
// }

// // ============================================================================
// // SECTION 1: CBAC PART A - RISK ASSESSMENT
// // ============================================================================
// async function fillCbacPartA(driver, isMale = false) {
//     console.log("=== [Part A] Starting CBAC: Risk Assessment ===");

//     const cbacTileContainer = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_general_registraion")'
//     );
//     if (await cbacTileContainer.isDisplayed().catch(() => false)) {
//         await cbacTileContainer.click();
//     }

//     const cbacDateField = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/edit_text_cbac_entry_date")'
//     );
//     await cbacDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const { x, y } = await cbacDateField.getLocation();
//     const { width, height } = await cbacDateField.getSize();
//     const centerX = Math.floor(x + width / 2);
//     const centerY = Math.floor(y + height / 2);

//     await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
//         await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
//         await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     }

//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("CBAC entry date confirmed!");

//     // Mandatory Multi-Select: "Does this person have" -> "None" (skips if already "None")
//     await selectCustomMultiSpinnerOptions(
//         driver,
//         "org.cphc.ncd.anm:id/spinner_does_this_person_have",
//         ["None"],
//         "None"
//     );

//     await expandAccordionAndWaitForChild(
//         driver,
//         "org.cphc.ncd.anm:id/expandable_risk_assessment",
//         "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type"
//     );
//     console.log("Part A: Risk Assessment accordion expanded!");

//     await selectSpinnerOption(
//         driver,
//         "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type",
//         "Never"
//     );

//     const alcoholNoRadio = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_consume_alcohol_daily_no")'
//     );
//     if ((await alcoholNoRadio.getAttribute('checked')) !== 'true') {
//         await alcoholNoRadio.click();
//     }

//     const primaryWaist = isMale ? "91-100 cm" : "81-90 cm";
//     const fallbackWaist = isMale ? "81-90 cm" : "91-100 cm";
//     await selectSpinnerOption(
//         driver,
//         "org.cphc.ncd.anm:id/spinner_waist_measurement_type",
//         primaryWaist,
//         fallbackWaist
//     );

//     const physicalActivityLessRadio = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_less_than_150_physical_activity")'
//     );
//     if ((await physicalActivityLessRadio.getAttribute('checked')) !== 'true') {
//         await physicalActivityLessRadio.click();
//     }

//     const familyBpNoRadio = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radio_button_family_history_blood_pressure_no")'
//     );
//     if ((await familyBpNoRadio.getAttribute('checked')) !== 'true') {
//         await familyBpNoRadio.click();
//     }

//     console.log("=== [Part A] CBAC Risk Assessment Completed ===\n");
// }

// // ============================================================================
// // SECTION 2: CBAC PART B - EARLY DETECTION (B1 + B2 WOMEN'S ONLY)
// // ============================================================================
// async function fillCbacPartB(driver) {
//     console.log("=== [Part B] Starting CBAC: Early Detection ===");

//     await expandAccordionAndWaitForChild(
//         driver,
//         "org.cphc.ncd.anm:id/expandable_early_detection",
//         "org.cphc.ncd.anm:id/text_view_early_detection_sub_title"
//     );
//     console.log("Part B: Early Detection accordion expanded!");

//     // 1. B1: Women and Men -> Ensure "No" (2nd RadioButton) is selected for all questions
//     for (const groupId of EARLY_DETECTION_B1_RADIO_GROUPS) {
//         await selectSecondRadioInGroup(driver, groupId);
//     }
//     console.log("Part B1 (Women and Men) questions completed!");

//     // 2. B2: Women Only Section (Always visible in layout, disabled for Men)
//     const firstWomensRadioSelector =
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast")' +
//         '.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))';

//     const firstWomensRadio = await scrollDownToElement(driver, firstWomensRadioSelector);

//     if (await firstWomensRadio.isEnabled().catch(() => false)) {
//         console.log("B2: Women-only radio buttons are enabled — ensuring 'No' for all 7 options...");

//         if ((await firstWomensRadio.getAttribute('checked')) !== 'true') {
//             await firstWomensRadio.click();
//         }

//         for (let i = 1; i < EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS.length; i++) {
//             await selectSecondRadioInGroup(driver, EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS[i]);
//         }
//         console.log("B2: Women-only questions completed!");
//     } else {
//         console.log("B2: Women-only radio buttons are disabled (Male patient) — skipping.");
//     }

//     console.log("=== [Part B] CBAC Early Detection Completed ===\n");
// }

// // ============================================================================
// // SECTION 3: CBAC PART C - RISK FACTORS FOR COPD
// // ============================================================================
// async function fillCbacPartC(driver) {
//     console.log("=== [Part C] Starting CBAC: Risk Factors for COPD ===");

//     // 1. Expand Part C Accordion and scroll into its body if opened near bottom edge
//     await expandAccordionAndWaitForChild(
//         driver,
//         "org.cphc.ncd.anm:id/expandable_risk_factor",
//         "org.cphc.ncd.anm:id/multi_spinner_fuel_type"
//     );
//     console.log("Part C: Risk Factors for COPD accordion expanded!");

//     // 2. Multi-Select Cooking Fuel: "Firewood" & "LPG" (skips if already set, never unchecks valid boxes)
//     await selectCustomMultiSpinnerOptions(
//         driver,
//         "org.cphc.ncd.anm:id/multi_spinner_fuel_type",
//         FUEL_OPTIONS_TO_SELECT,
//         "Firewood, LPG"
//     );
//     console.log("Cooking fuel selection completed!");

//     // 3. Answer all 3 Occupational Exposure questions with "No"
//     for (const groupId of COPD_OCCUPATIONAL_RADIO_GROUPS) {
//         await selectSecondRadioInGroup(driver, groupId);
//     }

//     console.log("=== [Part C] CBAC Risk Factors for COPD Completed ===\n");
// }

// // ============================================================================
// // SECTION 4: CBAC PART D - PHQ 2 & FINISH
// // ============================================================================
// async function fillCbacPartD(driver) {
//     console.log("=== [Part D] Starting CBAC: PHQ 2 ===");

//     // 1. Expand Part D Accordion and scroll into its body if opened near bottom edge
//     await expandAccordionAndWaitForChild(
//         driver,
//         "org.cphc.ncd.anm:id/expandable_phq",
//         "org.cphc.ncd.anm:id/spinner_little_interest_name"
//     );
//     console.log("Part D: PHQ 2 accordion expanded!");

//     // 2. First PHQ-2 Dropdown -> "Not at all"
//     await selectSpinnerOption(
//         driver,
//         "org.cphc.ncd.anm:id/spinner_little_interest_name",
//         "Not at all"
//     );

//     // 3. Second PHQ-2 Dropdown -> "Not at all"
//     await selectSpinnerOption(
//         driver,
//         "org.cphc.ncd.anm:id/spinner_feeling_down_name",
//         "Not at all"
//     );

//     // 4. Scroll down to FINISH button and submit CBAC
//     const finishButton = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/button_finish")'
//     );
//     await finishButton.click();
//     console.log("Clicked FINISH, waiting for Submit confirmation dialog...");

//     // 5. Confirm "YES" on "Are you sure you want to Submit?" dialog
//     const confirmYesButton = await driver.$(
//         'android=new UiSelector().resourceId("android:id/button1").text("YES")'
//     );
//     await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     await confirmYesButton.click();
//     await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });

//     console.log("=== [Part D] CBAC Submitted & Confirmed (YES) ===\n");
// }

// // ============================================================================
// // SECTION 5: PERSONAL EXAMINATION
// // ============================================================================
// async function fillPersonalExamination(driver, isMale = false) {
//     console.log("=== [Section 5] Starting Personal Examination ===");

//     // 1. Click Personal Examination tile on Screening Dashboard
//     const personalExamTile = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relative_layout_personal_examination")'
//     );
//     await personalExamTile.waitForDisplayed({ timeout: 10000 });
//     await personalExamTile.click();
//     console.log("Navigated to Personal Examination screen!");

//     // 2. Tap Visit Date using physical touch gesture and confirm OK
//     const visitDateField = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_examination_visit_date_input")'
//     );
//     await visitDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const { x, y } = await visitDateField.getLocation();
//     const { width, height } = await visitDateField.getSize();
//     const centerX = Math.floor(x + width / 2);
//     const centerY = Math.floor(y + height / 2);

//     await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
//         await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
//         await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     }

//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("Personal Examination visit date confirmed!");

//     // 3. Height (in cm): Male 160–180 | Female 150–160
//     const heightValue = isMale ? getRandomInt(160, 180) : getRandomInt(150, 160);
//     const heightInput = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/height_input")'
//     );
//     await heightInput.clearValue();
//     await heightInput.setValue(String(heightValue));

//     // 4. Weight (in Kg): Male 55–75 | Female 45–60
//     const weightValue = isMale ? getRandomInt(55, 75) : getRandomInt(45, 60);
//     const weightInput = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/weight_input")'
//     );
//     await weightInput.clearValue();
//     await weightInput.setValue(String(weightValue));

//     console.log(`Personal Exam (${isMale ? 'Male' : 'Female'}) -> Height: ${heightValue} cm | Weight: ${weightValue} Kg`);

//     try {
//         await driver.hideKeyboard();
//     } catch (e) {}

//     // 5. Click SAVE button
//     const saveButton = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_examination_save")'
//     );
//     await saveButton.click();
//     console.log("Clicked Personal Examination SAVE!");

//     // Dismiss post-save confirmation popup if displayed
//     const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
//         await postSaveOk.click();
//         await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//         console.log("Post-save confirmation dialog confirmed!");
//     }

//     console.log("=== [Section 5] Personal Examination Completed ===\n");
// }

// // ============================================================================
// // SECTION 6: PERSONAL HISTORY
// // ============================================================================
// async function fillPersonalHistory(driver) {
//     console.log("=== [Section 6] Starting Personal History ===");

//     // 1. Click Personal History tile on Screening Dashboard
//     const personalHistoryTile = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_history_registration")'
//     );
//     await personalHistoryTile.click();
//     console.log("Navigated to Personal History screen!");

//     // 2. Mark all Personal History conditions as "No" (skipping any already checked)
//     for (const noRadioId of PERSONAL_HISTORY_NO_RADIOS) {
//         const noRadio = await scrollDownToElement(
//             driver,
//             `android=new UiSelector().resourceId("${noRadioId}")`
//         );
//         if ((await noRadio.getAttribute('checked')) !== 'true') {
//             await noRadio.click();
//         }
//     }
//     console.log("All Personal History conditions marked as 'No'!");

//     // 3. Scroll down to SAVE button and submit
//     const saveButton = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_history_save")'
//     );
//     await saveButton.click();
//     console.log("Clicked Personal History SAVE!");

//     // Dismiss post-save confirmation popup if displayed
//     const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
//         await postSaveOk.click();
//         await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//         console.log("Post-save confirmation dialog confirmed!");
//     }

//     console.log("=== [Section 6] Personal History Completed ===\n");
// }

// // ============================================================================
// // SECTION 7: HYPERTENSION SCREENING
// // ============================================================================
// async function fillHypertensionScreening(driver) {
//     console.log("=== [Section 7] Starting Hypertension Screening ===");

//     // 1. Click Hypertension Screening tile on Screening Dashboard
//     const hypertensionTile = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_hyper_tension")'
//     );
//     await hypertensionTile.click();
//     console.log("Navigated to Hypertension Screening screen!");

//     // 2. Tap Screening Date using physical touch gesture and confirm OK
//     const hypertensionDateField = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_date_value")'
//     );
//     await hypertensionDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const { x, y } = await hypertensionDateField.getLocation();
//     const { width, height } = await hypertensionDateField.getSize();
//     const centerX = Math.floor(x + width / 2);
//     const centerY = Math.floor(y + height / 2);

//     await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
//         await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
//         await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     }

//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("Hypertension screening date confirmed!");

//     // 3. Systolic BP: Random value 100 to 120
//     const systolicValue = getRandomInt(100, 120);
//     const systolicInput = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_systolic_value")'
//     );
//     await systolicInput.clearValue();
//     await systolicInput.setValue(String(systolicValue));

//     // 4. Diastolic BP: Random value 70 to 80
//     const diastolicValue = getRandomInt(70, 80);
//     const diastolicInput = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_diastolic_value")'
//     );
//     await diastolicInput.clearValue();
//     await diastolicInput.setValue(String(diastolicValue));

//     console.log(`Hypertension BP -> Systolic: ${systolicValue} mmHg | Diastolic: ${diastolicValue} mmHg`);

//     try {
//         await driver.hideKeyboard();
//     } catch (e) {}

//     // 5. Click SAVE & FINISH button
//     const saveButton = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_save")'
//     );
//     await saveButton.click();
//     console.log("Clicked Hypertension SAVE & FINISH!");

//     // Dismiss post-save confirmation popup if displayed
//     const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
//         await postSaveOk.click();
//         await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//         console.log("Post-save confirmation dialog confirmed!");
//     }

//     console.log("=== [Section 7] Hypertension Screening Completed ===\n");
// }

// // ============================================================================
// // SECTION 8: DIABETES SCREENING
// // ============================================================================
// async function fillDiabetesScreening(driver) {
//     console.log("=== [Section 8] Starting Diabetes Screening ===");

//     // 1. Click Diabetes Screening tile on Screening Dashboard
//     const diabetesTile = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_diabetes")'
//     );
//     await diabetesTile.click();
//     console.log("Navigated to Diabetes Screening screen!");

//     // 2. Tap Screening Date using physical touch gesture and confirm OK
//     const diabetesDateField = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_date_value")'
//     );
//     await diabetesDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const { x, y } = await diabetesDateField.getLocation();
//     const { width, height } = await diabetesDateField.getSize();
//     const centerX = Math.floor(x + width / 2);
//     const centerY = Math.floor(y + height / 2);

//     await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
//         await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
//         await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     }

//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("Diabetes screening date confirmed!");

//     // 3. Fasting Blood Sugar: Random value 80 to 100
//     const fastingSugarValue = getRandomInt(80, 100);
//     const fastingSugarInput = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_fasting_sugar_value")'
//     );
//     await fastingSugarInput.clearValue();
//     await fastingSugarInput.setValue(String(fastingSugarValue));
//     console.log(`Diabetes Fasting Sugar -> ${fastingSugarValue} mg/dL`);

//     try {
//         await driver.hideKeyboard();
//     } catch (e) {}

//     // 4. Click SAVE & FINISH button
//     const saveButton = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_save")'
//     );
//     await saveButton.click();
//     console.log("Clicked Diabetes SAVE & FINISH!");

//     // Dismiss post-save confirmation popup if displayed
//     const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
//         await postSaveOk.click();
//         await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//         console.log("Post-save confirmation dialog confirmed!");
//     }

//     console.log("=== [Section 8] Diabetes Screening Completed ===\n");
// }

// // ============================================================================
// // SECTION 9: ORAL SCREENING (SYMPTOMS -> EXAM -> PHOTO -> REFERRAL & FINISH)
// // ============================================================================
// async function fillOralScreening(driver) {
//     console.log("=== [Section 9] Starting Oral Screening ===");

//     // 1. Click Oral Screening tile on Screening Dashboard
//     const oralTile = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_oral_screening")'
//     );
//     await oralTile.click();
//     console.log("Navigated to Oral Screening screen!");

//     // 2. Step 1 (Oral Symptoms): Confirm Visit Date via physical touch gesture -> OK
//     const oralVisitDateField = await driver.$(
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/oral_symptom_visit_date_input")'
//     );
//     await oralVisitDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

//     const { x, y } = await oralVisitDateField.getLocation();
//     const { width, height } = await oralVisitDateField.getSize();
//     const centerX = Math.floor(x + width / 2);
//     const centerY = Math.floor(y + height / 2);

//     await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });

//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
//         await driver.execute('mobile: clickGesture', { x: centerX, y: centerY });
//         await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
//     }

//     await okButton.click();
//     await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//     console.log("Oral Screening visit date confirmed!");

//     // Click SAVE & NEXT on Oral Symptoms tab
//     const oralSymptomsSaveBtn = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/oral_symptoms_save")'
//     );
//     await oralSymptomsSaveBtn.click();
//     console.log("Clicked Oral Symptoms SAVE & NEXT!");

//     // 3. Step 2 (Oral Exam): Mark all conditions as "No" (skipping any already checked)
//     for (const noRadioId of ORAL_EXAM_NO_RADIOS) {
//         const noRadio = await scrollDownToElement(
//             driver,
//             `android=new UiSelector().resourceId("${noRadioId}")`
//         );
//         if ((await noRadio.getAttribute('checked')) !== 'true') {
//             await noRadio.click();
//         }
//     }
//     console.log("All Oral Exam conditions marked as 'No'!");

//     const oralExamSaveBtn = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_oral_exam_save")'
//     );
//     await oralExamSaveBtn.click();
//     console.log("Clicked Oral Exam SAVE & NEXT!");

//     // 4. Step 3 (Oral Photo): Click SAVE & NEXT
//     const oralPhotoSaveBtn = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_oral_photo_save")'
//     );
//     await oralPhotoSaveBtn.click();
//     console.log("Clicked Oral Photo SAVE & NEXT!");

//     // 5. Step 4 (Cancer Referral): Select "No" and click SAVE & FINISH
//     const referralNoRadio = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_referral_no")'
//     );
//     if ((await referralNoRadio.getAttribute('checked')) !== 'true') {
//         await referralNoRadio.click();
//     }
//     console.log("Selected 'No' for Cancer Referral!");

//     const referralSaveBtn = await scrollDownToElement(
//         driver,
//         'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/referral_save")'
//     );
//     await referralSaveBtn.click();
//     console.log("Clicked Referral SAVE & FINISH!");

//     // Dismiss post-save confirmation popup if displayed
//     const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
//         await postSaveOk.click();
//         await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
//         console.log("Post-save confirmation dialog confirmed!");
//     }

//     console.log("=== [Section 9] Oral Screening Completed ===\n");

//     // --- STEP 9: Trigger Android Back Button ---
//         await driver.pause(1000); // Wait 1 sec for UI to stabilize
//         await driver.pressKeyCode(4);
//         console.log("Android Back button pressed successfully!");

//         // console.log("CBAC workflow segment completed successfully!");
// }

// // ============================================================================
// // MASTER FLOW ORCHESTRATOR
// // ============================================================================
// async function runCompleteAutomationFlow() {
//     const driver = await remote(opts);
//     let enrolledGenderIsMale = false;

//     try {
//         if (FLOW_STEPS.runEnrollment) {
//             const enrollmentResult = await fillIndividualEnrollment(driver);
//             enrolledGenderIsMale = enrollmentResult.isMale;
//         }

//         if (FLOW_STEPS.runCbacPartA) {
//             await fillCbacPartA(driver, enrolledGenderIsMale);
//         }

//         if (FLOW_STEPS.runCbacPartB) {
//             await fillCbacPartB(driver);
//         }

//         if (FLOW_STEPS.runCbacPartC) {
//             await fillCbacPartC(driver);
//         }

//         if (FLOW_STEPS.runCbacPartD) {
//             await fillCbacPartD(driver);
//         }

//         if (FLOW_STEPS.runPersonalExam) {
//             await fillPersonalExamination(driver, enrolledGenderIsMale);
//         }

//         if (FLOW_STEPS.runPersonalHistory) {
//             await fillPersonalHistory(driver);
//         }

//         if (FLOW_STEPS.runHypertensionScreening) {
//             await fillHypertensionScreening(driver);
//         }

//         if (FLOW_STEPS.runDiabetesScreening) {
//             await fillDiabetesScreening(driver);
//         }

//         if (FLOW_STEPS.runOralScreening) {
//             await fillOralScreening(driver);
//         }

//         console.log("ENABLED SECTIONS COMPLETED SUCCESSFULLY!");
//     } catch (error) {
//         console.error("Automation flow encountered an error:", error);
//     } finally {
//         await driver.deleteSession();
//     }
// }

// if (require.main === module) {
//     runCompleteAutomationFlow();
// }

// module.exports = {
//     fillIndividualEnrollment,
//     fillCbacPartA,
//     fillCbacPartB,
//     fillCbacPartC,
//     fillCbacPartD,
//     fillPersonalExamination,
//     fillPersonalHistory,
//     fillHypertensionScreening,
//     fillDiabetesScreening,
//     fillOralScreening,
//     runCompleteAutomationFlow
// };

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
// LOOP CONFIGURATION (HOW MANY INDIVIDUAL ENTRIES TO COMPLETE IN ONE RUN)
// ============================================================================
const TOTAL_ENTRIES_TO_RUN = 50; // Set to 1 for single entry, N for N entries, or Infinity for continuous loop

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
    runEnrollment: true,             // Section 0: Individual Enrollment
    runCbacPartA: true,              // Section 1: CBAC Part A - Risk Assessment
    runCbacPartB: true,              // Section 2: CBAC Part B - Early Detection (+ Women Only)
    runCbacPartC: true,              // Section 3: CBAC Part C - Risk Factors for COPD
    runCbacPartD: true,              // Section 4: CBAC Part D - PHQ 2 & Finish
    runPersonalExam: true,           // Section 5: Personal Examination
    runPersonalHistory: true,        // Section 6: Personal History
    runHypertensionScreening: true,  // Section 7: Hypertension Screening
    runDiabetesScreening: true,      // Section 8: Diabetes Screening
    runOralScreening: true,          // Section 9: Oral Screening
    runExitAndResetToStart: true     // Section 10: Press Back -> Click YES -> Return to Start Screen
};

// ============================================================================
// STATIC TEST DATA & ELEMENT CONSTANTS
// ============================================================================
const MALE_NAMES = [
    // 1-25
    "Rajesh Kumar", "Amit Sharma", "Sanjay Singh", "Vijay Verma", "Manoj Yadav",
    "Sunil Patel", "Ramesh Prasad", "Dharmendra Kumar", "Pankaj Das", "Anil Gupta",
    "Ravi Shankar", "Deepak Kumar", "Suresh Sahni", "Vikas Pandit", "Rakesh Mishra",
    "Alok Ranjan", "Mukesh Kumar", "Santosh kumar", "Ajay Kumar", "Pravin Kumar",
    "Bikram Singh", "Dinesh Chandra", "Ashok Kumar", "Gaurav Srivastava", "Manish Pandey",

    // 26-50
    "Ram Kishor", "Mahendra Mahato", "Hari Om", "Shyam Lal", "Basant Paswan",
    "Subhash Rajbhar", "Devendra Pal", "Satish Bind", "Lallan Chaurasiya", "Ganesh Mahto",
    "Jagdish Prasad", "Narendra Dev", "Vinod Thakur", "Arun Maurya", "Kameshwar Roy",
    "Babulal Sharma", "Pramod Patel", "Gautam Chauhan", "Surendra Yadav", "Shambhu Nath",
    "Maheshwar Singh", "Phool Chand", "Kailash Giri", "Umesh Chandra", "Sitaram Nishad",

    // 51-75
    "Satyendra Kumar", "Jitendra Bhagat", "Bhola Ram", "Radhey Shyam", "Badri Prasad",
    "Kishore Mandal", "Rajendra Singh", "Nand Lal", "Ram Lakhan", "Shriniwas Pandit",
    "Ramswaroop Pal", "Mithilesh Prasad", "Tribhuvan Nath", "Dukhi Ram", "Bharat Mahato",
    "Ramlallu Verma", "Awadhesh Prasad", "Ganga morya", "Suraj Bhan", "Hariram Maurya",
    "Balram Singh", "Janardan Sahni", "Parameshwar Paswan", "Chhedi Lal", "Brijesh Gautam",

    // 76-100
    "Bhairav Singh", "Daya Shankar", "Maniram Yadav", "Shiv Pujan", "Kishan Lal",
    "Girija Shankar", "Chhote Lal", "Sukhdev Giri", "Rambriksh Roy", "Paras Nath",
    "Nageshwar Mahato", "Raghuveer Singh", "Kalu Ram", "Sohan Lal", "Jagat Pal",
    "Shiv Shankar", "Dhananjay Prasad", "Beni Prasad", "Bhagwan Das", "Rajdev Bind",
    "Surya Bhan", "Kedar Nath", "Moti Lal", "Lal Bahadur", "Dinabandhu Sahu",

    // 101-125
    "Amresh Chandra", "Jugal Kishor", "Ram Naresh", "Shambhu Saran", "Kamleshwar Roy",
    "Bhagwati Prasad", "Nirmal Mahato", "Doodhnath Singh", "Lakhpat Ram", "Tej Bahadur",
    "Ram Sharan", "Subedar Pal", "Rajaram Maurya", "Dukharan Das", "Ghanaram Sahu",
    "Bhole Shankar", "Mangal Dev", "Vidyadhar Pandit", "Kishuni Ram", "Lala Ram",
    "Sukhram Yadav", "Shiv Charan", "Tirath Nath", "Harihar Prasad", "Deep Chand",

    // 126-150
    "Hira Lal", "Prem Chand", "Mahabir Singh", "Shiv Shambhu", "Babu Ram",
    "Nanku Ram", "Somaru Bhagat", "Raghunath Mahato", "Janki Prasad", "Prabhu Nath",
    "Devraj Pal", "Dharam Pal", "Balkishan Sharma", "Gopichand kumar", "Sundar Lal",
    "Ram Vilas", "Kameshwar Singh", "Gaurishankar Roy", "Narayan Das", "Shripat Ram",
    "Bhola Nath", "Ram Chander", "Hardev Giri", "Rupchand Patel", "Madan Mohan",

    // 151-175
    "Parvati Nandan", "Ram Kumar", "Kripa Shankar", "Sheo Prasad", "Ganga Ram",
    "Sadhu Saran", "Baliram Yadav", "Lakhan Lal", "Vaidyanath Mahato", "Badri kumar",
    "Bindeshwar Roy", "Ramashray Singh", "Chandra Bhan", "Beni Ram", "Shankar Das",
    "Nathuni Ram", "Dukhi Sahu", "Jagannath Prasad", "Ghanashyam Pal", "Binda Din",
    "Ram Asrey", "Sitaram Bhagat", "Paras Ram", "Vishwa Nath", "Suraj Ram",

    // 176-200
    "Ram Briksh", "Mahadev Prasad", "Sheopujan Singh", "Hari Ram", "Lalta Prasad",
    "Devi Sharan", "Jagan Lal", "Babulal Sahu", "Nand Kishor", "Kailash Nath",
    "Somnath Giri", "Dhanpat Ram", "Ganga Saran", "Jagdev Prasad", "Kanhaiya Lal",
    "Shiv Prasad", "Ram Balak", "Radhe Mohan", "Brij Lal", "Munna Lal",
    "Suraj Deo", "Shriram Pal", "Subhash Chandra", "Kishan Chand", "Ram Bahadur"
];

const FEMALE_NAMES = [
    // 1-25 (Reference Batch)
    "Sunita Devi", "Anita Sharma", "Pooja Devi", "Rekha Kumari", "Manju Devi",
    "Suman Lata", "Kiran Devi", "Geeta Sharma", "Seema Kumari", "Asha Devi",
    "Usha Devi", "Meena Kumari", "Rita Devi", "Sangita Sharma", "Shanti Devi",
    "Kavita Kumari", "Sarita Devi", "Rinku Devi", "Mamta Kumari", "Priyanka Sharma",
    "Shobha Devi", "Bina Devi", "Sushila Devi", "Nirmala Kumari", "Poonam Devi",

    // 26-50
    "Phoolmati Devi", "Basanti Devi", "Ramvati Kumari", "Munni Devi", "Phoolwa Devi",
    "Kusum Lata", "Kanti Devi", "Savitri Devi", "Kaushalya Devi", "Parvati Devi",
    "Durga Kumari", "Ganga Devi", "Bhagwati Devi", "Lakshminia Devi", "Sheela Kumari",
    "Janki Devi", "Anarkali Devi", "Guddi Kumari", "Lalita Devi", "Kamla Devi",
    "Radha Devi", "Premwati Kumari", "Vidya Devi", "Kalawati Devi", "Raj Kumari",

    // 51-75
    "Champa Devi", "Dropadi Devi", "Indu Kumari", "Bachhi Devi", "Kunti Devi",
    "Saraswati Devi", "Tara Devi", "Chameli Devi", "Chandrawati Kumari", "Lilawati Devi",
    "Premila Devi", "Subhadra Devi", "Kewala Devi", "Badami Devi", "Shakuntala Kumari",
    "Bimla Devi", "Malti Devi", "Gayatri Devi", "Santoshi Kumari", "Sonmati Devi",
    "Sharda Devi", "Maya Devi", "Pushpa Kumari", "Kailashi Devi", "Dhanwanti Devi",

    // 76-100
    "Chinta Devi", "Dukhni Devi", "Gyanmati Kumari", "Shanti Lata", "Prabhavati Devi",
    "Sita Devi", "Sita Kumari", "Bhanumati Devi", "Devki Kumari", "Rani Devi",
    "Suman Devi", "Neelam Kumari", "Chanderwati Devi", "Manorama Devi", "Binda Devi",
    "Rajpati Devi", "Savitri Kumari", "Kamlesh Devi", "Gulabi Devi", "Ram rati Devi",
    "Jhagru Devi", "Sugiya Devi", "Girija Devi", "Brijlata Devi", "Nandrani Devi",

    // 101-125
    "Dhanraji Devi", "Rambha Devi", "Vidyawati Kumari", "Kalyani Devi", "Mina Devi",
    "Basheera Devi", "Anandi Devi", "Sumitra Devi", "Shanti Sharma", "Gita Kumari",
    "Sarda Devi", "Phool Kumari", "Ramkuwari Devi", "Kaushilya Kumari", "Sudama Devi",
    "Vimala Devi", "Mateshwari Devi", "Pari Devi", "Parwati Kumari", "Muni Devi",
    "Kushma Devi", "Rajwanti Devi", "Satya Devi", "Sulochana Kumari", "Maina Devi",

    // 126-150
    "Subhavati Devi", "Nirupa Devi", "Shyama Devi", "Kamlesh Kumari", "Shobhawati Devi",
    "Taramati Devi", "Dulari Devi", "Jagatpati Devi", "Fulwa Kumari", "Kishori Devi",
    "Ahilya Devi", "Sampati Devi", "Maheshwari Devi", "Durgawati Kumari", "Leela Devi",
    "Muniya Devi", "Pyari Devi", "Manrakhan Devi", "Ramdulari Kumari", "Phoolan Devi",
    "Nageshwari Devi", "Sunaina Devi", "Bindeshwari Devi", "Rajrani Kumari", "Gangi Devi",

    // 151-175
    "Chhoti Devi", "Fulmati Kumari", "Devanti Devi", "Shivkumari Devi", "Basumati Devi",
    "Radhika Devi", "Rukhmani Devi", "Kamla Kumari", "Shrimati Devi", "Kalwa Devi",
    "Lachhminia Devi", "Shriwanti Devi", "Bhagmania Devi", "Mateshwari Kumari", "Sonmani Devi",
    "Sonam Kumari", "Janakdulari Devi", "Bachi Kumari", "Maharani Devi", "Phoolwa Kumari",
    "Reshma Devi", "Guddi Devi", "Vidyanti Kumari", "Vidyawati Devi", "Sudha Devi",

    // 176-200
    "Devki Devi", "Bhagwati Kumari", "Ramkali Devi", "Chhoto Devi", "Rajmati Devi",
    "Suryanti Devi", "Ramdevi Kumari", "Champa Kumari", "Nirmala Sharma", "Vimla Kumari",
    "Nirbhay Devi", "Manju Kumari", "Sunita Sharma", "Sangita Devi", "Bachhi Kumari",
    "Lilawati Kumari", "Prabhawati Kumari", "Suman Kumari", "Rekha Sharma", "Geeta Devi",
    "Kamlawati Devi", "Shakuntala Devi", "Pushpa Devi", "Sarita Kumari", "Usha Sharma"
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

const PERSONAL_HISTORY_NO_RADIOS = [
    "org.cphc.ncd.anm:id/hypertension_no",
    "org.cphc.ncd.anm:id/diabeties_no",
    "org.cphc.ncd.anm:id/heart_disease_no",
    "org.cphc.ncd.anm:id/stroke_no",
    "org.cphc.ncd.anm:id/kidney_failure_no",
    "org.cphc.ncd.anm:id/nonhealing_wound_no",
    "org.cphc.ncd.anm:id/copd_no",
    "org.cphc.ncd.anm:id/asthma_no",
    "org.cphc.ncd.anm:id/oral_cancer_no",
    "org.cphc.ncd.anm:id/other_no"
];

const ORAL_EXAM_NO_RADIOS = [
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_white_no",
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_red_no",
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_ulcer_no",
    "org.cphc.ncd.anm:id/radiogroup_oral_exam_growth_no",
    "org.cphc.ncd.anm:id/radiogroup_oral_exam_lockedjaw_no"
];

// ============================================================================
// UTILITY & GESTURE HELPERS
// ============================================================================

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

    // const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    // await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    // await okButton.click();
    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    try {
        // if (await okButton.waitForDisplayed({ timeout: 5000 })) {
        //     await okButton.click();
        //     console.log("Dismissed confirmation popup.");
        // }
    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await okButton.click();
    } catch (e) {
        console.log("Confirmation popup not present for this entry, proceeding...");
    }
    await okButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
    console.log("Enrollment date confirmed!");

    const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
    await villageSpinner.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await villageSpinner.click();

    const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
    await villageOption.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await villageOption.click();
    console.log("Village selected!");

    // const isMale = Math.random() < 0.5;
    const isMale = true;

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
    console.log("Clicked FINISH, waiting for Submit confirmation dialog...");

    // 5. Confirm "YES" on "Are you sure you want to Submit?" dialog
    const confirmYesButton = await driver.$(
        'android=new UiSelector().resourceId("android:id/button1").text("YES")'
    );
    await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await confirmYesButton.click();
    await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });

    console.log("=== [Part D] CBAC Submitted & Confirmed (YES) ===\n");
}

// ============================================================================
// SECTION 5: PERSONAL EXAMINATION
// ============================================================================
async function fillPersonalExamination(driver, isMale = false) {
    console.log("=== [Section 5] Starting Personal Examination ===");

    // 1. Click Personal Examination tile on Screening Dashboard
    const personalExamTile = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relative_layout_personal_examination")'
    );
    await personalExamTile.waitForDisplayed({ timeout: 10000 });
    await personalExamTile.click();
    console.log("Navigated to Personal Examination screen!");

    // 2. Tap Visit Date using physical touch gesture and confirm OK
    const visitDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_examination_visit_date_input")'
    );
    await visitDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const { x, y } = await visitDateField.getLocation();
    const { width, height } = await visitDateField.getSize();
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
    console.log("Personal Examination visit date confirmed!");

    // 3. Height (in cm): Male 160–180 | Female 150–160
    const heightValue = isMale ? getRandomInt(160, 180) : getRandomInt(150, 160);
    const heightInput = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/height_input")'
    );
    await heightInput.clearValue();
    await heightInput.setValue(String(heightValue));

    // 4. Weight (in Kg): Male 55–75 | Female 45–60
    const weightValue = isMale ? getRandomInt(55, 75) : getRandomInt(45, 60);
    const weightInput = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/weight_input")'
    );
    await weightInput.clearValue();
    await weightInput.setValue(String(weightValue));

    console.log(`Personal Exam (${isMale ? 'Male' : 'Female'}) -> Height: ${heightValue} cm | Weight: ${weightValue} Kg`);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    // 5. Click SAVE button
    const saveButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_examination_save")'
    );
    await saveButton.click();
    console.log("Clicked Personal Examination SAVE!");

    // Dismiss post-save confirmation popup if displayed
    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
        await postSaveOk.click();
        await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
        console.log("Post-save confirmation dialog confirmed!");
    }

    console.log("=== [Section 5] Personal Examination Completed ===\n");
}

// ============================================================================
// SECTION 6: PERSONAL HISTORY
// ============================================================================
async function fillPersonalHistory(driver) {
    console.log("=== [Section 6] Starting Personal History ===");

    // 1. Click Personal History tile on Screening Dashboard
    const personalHistoryTile = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_history_registration")'
    );
    await personalHistoryTile.click();
    console.log("Navigated to Personal History screen!");

    // 2. Mark all Personal History conditions as "No" (skipping any already checked)
    for (const noRadioId of PERSONAL_HISTORY_NO_RADIOS) {
        const noRadio = await scrollDownToElement(
            driver,
            `android=new UiSelector().resourceId("${noRadioId}")`
        );
        if ((await noRadio.getAttribute('checked')) !== 'true') {
            await noRadio.click();
        }
    }
    console.log("All Personal History conditions marked as 'No'!");

    // 3. Scroll down to SAVE button and submit
    const saveButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/personal_history_save")'
    );
    await saveButton.click();
    console.log("Clicked Personal History SAVE!");

    // Dismiss post-save confirmation popup if displayed
    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
        await postSaveOk.click();
        await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
        console.log("Post-save confirmation dialog confirmed!");
    }

    console.log("=== [Section 6] Personal History Completed ===\n");
}

// ============================================================================
// SECTION 7: HYPERTENSION SCREENING
// ============================================================================
async function fillHypertensionScreening(driver) {
    console.log("=== [Section 7] Starting Hypertension Screening ===");

    // 1. Click Hypertension Screening tile on Screening Dashboard
    const hypertensionTile = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_hyper_tension")'
    );
    await hypertensionTile.click();
    console.log("Navigated to Hypertension Screening screen!");

    // 2. Tap Screening Date using physical touch gesture and confirm OK
    const hypertensionDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_date_value")'
    );
    await hypertensionDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const { x, y } = await hypertensionDateField.getLocation();
    const { width, height } = await hypertensionDateField.getSize();
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
    console.log("Hypertension screening date confirmed!");

    // 3. Systolic BP: Random value 100 to 120
    const systolicValue = getRandomInt(100, 120);
    const systolicInput = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_systolic_value")'
    );
    await systolicInput.clearValue();
    await systolicInput.setValue(String(systolicValue));

    // 4. Diastolic BP: Random value 70 to 80
    const diastolicValue = getRandomInt(70, 80);
    const diastolicInput = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_diastolic_value")'
    );
    await diastolicInput.clearValue();
    await diastolicInput.setValue(String(diastolicValue));

    console.log(`Hypertension BP -> Systolic: ${systolicValue} mmHg | Diastolic: ${diastolicValue} mmHg`);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    // 5. Click SAVE & FINISH button
    const saveButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/hypertension_save")'
    );
    await saveButton.click();
    console.log("Clicked Hypertension SAVE & FINISH!");

    // Dismiss post-save confirmation popup if displayed
    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
        await postSaveOk.click();
        await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
        console.log("Post-save confirmation dialog confirmed!");
    }

    console.log("=== [Section 7] Hypertension Screening Completed ===\n");
}

// ============================================================================
// SECTION 8: DIABETES SCREENING
// ============================================================================
async function fillDiabetesScreening(driver) {
    console.log("=== [Section 8] Starting Diabetes Screening ===");

    // 1. Click Diabetes Screening tile on Screening Dashboard
    const diabetesTile = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_diabetes")'
    );
    await diabetesTile.click();
    console.log("Navigated to Diabetes Screening screen!");

    // 2. Tap Screening Date using physical touch gesture and confirm OK
    const diabetesDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_date_value")'
    );
    await diabetesDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const { x, y } = await diabetesDateField.getLocation();
    const { width, height } = await diabetesDateField.getSize();
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
    console.log("Diabetes screening date confirmed!");

    // 3. Fasting Blood Sugar: Random value 80 to 100
    const fastingSugarValue = getRandomInt(80, 100);
    const fastingSugarInput = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_fasting_sugar_value")'
    );
    await fastingSugarInput.clearValue();
    await fastingSugarInput.setValue(String(fastingSugarValue));
    console.log(`Diabetes Fasting Sugar -> ${fastingSugarValue} mg/dL`);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    // 4. Click SAVE & FINISH button
    const saveButton = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/diabetes_save")'
    );
    await saveButton.click();
    console.log("Clicked Diabetes SAVE & FINISH!");

    // Dismiss post-save confirmation popup if displayed
    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
        await postSaveOk.click();
        await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
        console.log("Post-save confirmation dialog confirmed!");
    }

    console.log("=== [Section 8] Diabetes Screening Completed ===\n");
}

// ============================================================================
// SECTION 9: ORAL SCREENING (SYMPTOMS -> EXAM -> PHOTO -> REFERRAL & FINISH)
// ============================================================================
async function fillOralScreening(driver) {
    console.log("=== [Section 9] Starting Oral Screening ===");

    // 1. Click Oral Screening tile on Screening Dashboard
    const oralTile = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relativelayout_oral_screening")'
    );
    await oralTile.click();
    console.log("Navigated to Oral Screening screen!");

    // 2. Step 1 (Oral Symptoms): Confirm Visit Date via physical touch gesture -> OK
    const oralVisitDateField = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/oral_symptom_visit_date_input")'
    );
    await oralVisitDateField.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });

    const { x, y } = await oralVisitDateField.getLocation();
    const { width, height } = await oralVisitDateField.getSize();
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
    console.log("Oral Screening visit date confirmed!");

    // Click SAVE & NEXT on Oral Symptoms tab
    const oralSymptomsSaveBtn = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/oral_symptoms_save")'
    );
    await oralSymptomsSaveBtn.click();
    console.log("Clicked Oral Symptoms SAVE & NEXT!");

    // 3. Step 2 (Oral Exam): Mark all conditions as "No" (skipping any already checked)
    for (const noRadioId of ORAL_EXAM_NO_RADIOS) {
        const noRadio = await scrollDownToElement(
            driver,
            `android=new UiSelector().resourceId("${noRadioId}")`
        );
        if ((await noRadio.getAttribute('checked')) !== 'true') {
            await noRadio.click();
        }
    }
    console.log("All Oral Exam conditions marked as 'No'!");

    const oralExamSaveBtn = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_oral_exam_save")'
    );
    await oralExamSaveBtn.click();
    console.log("Clicked Oral Exam SAVE & NEXT!");

    // 4. Step 3 (Oral Photo): Click SAVE & NEXT
    const oralPhotoSaveBtn = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_oral_photo_save")'
    );
    await oralPhotoSaveBtn.click();
    console.log("Clicked Oral Photo SAVE & NEXT!");

    // 5. Step 4 (Cancer Referral): Select "No" and click SAVE & FINISH
    const referralNoRadio = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/cancer_referral_no")'
    );
    if ((await referralNoRadio.getAttribute('checked')) !== 'true') {
        await referralNoRadio.click();
    }
    console.log("Selected 'No' for Cancer Referral!");

    const referralSaveBtn = await scrollDownToElement(
        driver,
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/referral_save")'
    );
    await referralSaveBtn.click();
    console.log("Clicked Referral SAVE & FINISH!");

    // Dismiss post-save confirmation popup if displayed
    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2500 }).catch(() => false)) {
        await postSaveOk.click();
        await postSaveOk.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });
        console.log("Post-save confirmation dialog confirmed!");
    }

    console.log("=== [Section 9] Oral Screening Completed ===\n");
}

// ============================================================================
// SECTION 10: EXIT SCREENING DASHBOARD -> CLICK YES -> RETURN TO FIRST SCREEN
// ============================================================================
async function exitScreeningDashboard(driver) {
    console.log("=== [Section 10] Exiting Screening Dashboard to Start Screen ===");

    // 1. Trigger system/hardware Back button to open exit confirmation dialog
    await driver.back();
    console.log("Pressed Back button, waiting for YES confirmation popup...");

    // 2. Click "YES" (android:id/button1) on the confirmation dialog
    const confirmYesButton = await driver.$(
        'android=new UiSelector().resourceId("android:id/button1").text("YES")'
    );
    await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout });
    await confirmYesButton.click();
    await confirmYesButton.waitForDisplayed({ timeout: SPEED_CONFIG.elementTimeout, reverse: true });

    console.log("=== [Section 10] Returned to Initial Screen ===\n");
}

// ============================================================================
// SINGLE ENTRY WORKFLOW RUNNER
// ============================================================================
async function executeSingleEntryWorkflow(driver) {
    let enrolledGenderIsMale = false;

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

    if (FLOW_STEPS.runPersonalExam) {
        await fillPersonalExamination(driver, enrolledGenderIsMale);
    }

    if (FLOW_STEPS.runPersonalHistory) {
        await fillPersonalHistory(driver);
    }

    if (FLOW_STEPS.runHypertensionScreening) {
        await fillHypertensionScreening(driver);
    }

    if (FLOW_STEPS.runDiabetesScreening) {
        await fillDiabetesScreening(driver);
    }

    if (FLOW_STEPS.runOralScreening) {
        await fillOralScreening(driver);
    }

    if (FLOW_STEPS.runExitAndResetToStart) {
        await exitScreeningDashboard(driver);
    }
}

// ============================================================================
// MASTER LOOP ORCHESTRATOR
// ============================================================================
async function runCompleteAutomationFlow(totalEntries = TOTAL_ENTRIES_TO_RUN) {
    const driver = await remote(opts);
    let completedCount = 0;
    let failedCount = 0;

    for (let entryIndex = 1; entryIndex <= totalEntries; entryIndex++) {
        console.log(`************************************************************`);
        console.log(`STARTING ENTRY ${entryIndex}${Number.isFinite(totalEntries) ? ` OF ${totalEntries}` : ''}`);
        console.log(`************************************************************\n`);

        try {
            // Execute the workflow for this single entry
            await executeSingleEntryWorkflow(driver);
            completedCount++;
            console.log(`>>> ENTRY ${entryIndex} COMPLETED SUCCESSFULLY! (Total Done: ${completedCount})\n`);

            // Small pause between records to let UI stabilize
            await driver.pause(1500);

        } catch (error) {
            failedCount++;
            console.error(`❌ Automation flow encountered an error on entry #${entryIndex}:`, error.message);
            
            // Recovery: Attempt to bring the app back to a safe state by pressing the back button
            try {
                console.log(`Attempting recovery via Back button...`);
                await driver.pressKeyCode(4);
                await driver.pause(1000);
            } catch (recoveryErr) {
                console.error(`Recovery back-press failed:`, recoveryErr.message);
            }

            console.log(`Continuing to next entry... (Failed so far: ${failedCount})\n`);
        }
    }

    console.log(`============================================================`);
    console.log(`AUTOMATION FINISHED! Completed: ${completedCount} | Failed: ${failedCount}`);
    console.log(`============================================================`);

    // Safely delete session only after ALL loops have finished
    try {
        await driver.deleteSession();
    } catch (e) {
        console.log("Session already closed.");
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
    fillPersonalExamination,
    fillPersonalHistory,
    fillHypertensionScreening,
    fillDiabetesScreening,
    fillOralScreening,
    exitScreeningDashboard,
    executeSingleEntryWorkflow,
    runCompleteAutomationFlow
};