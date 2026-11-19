const STAGES_META = [
  {
    id: 1,
    title: "Data Loading & Initial Profiling",
    cellRange: "Cells 0 – 35",
    startCell: 0,
    endCell: 35,
    badgeColor: "blue",
    shortDesc: "Ingesting DataCo Supply Chain (180,519 rows × 53 cols), missing value audit, target class distribution, and initial cross-tabulations.",
    friendlyTakeaway: "We start with 180,519 individual product lines coming from 65,752 customer orders (~2.75 items per order). Over half of all shipments (54.83%) arrive late, and two columns with missing data (Product Description at 100% empty and Order Zipcode at 86.22% empty) are flagged immediately.",
    overview: "Loads the three source datasets (DataCoSupplyChainDataset.csv with 180,519 order-item records and 53 columns, DescriptionDataCoSupplyChain.csv, and tokenized_access_logs.csv), inspects data types and missingness, verifies zero duplicate rows, profiles unique identifiers (65,752 unique Order IDs across 180,519 order items), and establishes initial risk distributions across Shipping Mode, Order Region, and Product Category.",
    metrics: [
      { label: "Total Order-Item Rows", value: "180,519" },
      { label: "Unique Orders (Order Id)", value: "65,752" },
      { label: "Unique Customers", value: "20,652" },
      { label: "Target Late Rate (Class 1)", value: "54.83% (98,977)" }
    ],
    activities: [
      {
        name: "Activity 1.1: Dataset Ingestion & Schema Inspection",
        cells: "Cells 0 – 7",
        points: [
          "Imports Pandas, Seaborn, Matplotlib and configures full-column display.",
          "Loads DataCoSupplyChainDataset.csv (180,519 × 53), Description table (52 × 2), and Access Logs (469,977 × 8).",
          "Profiles numerical and object columns via orders.info() and orders.describe(include='all').T."
        ]
      },
      {
        name: "Activity 1.2: Missing Values, Duplicates & Cardinality Audit",
        cells: "Cells 8 – 11",
        points: [
          "Confirms 0 full-row duplicates across 180,519 rows.",
          "Identifies 4 columns with missing values: Product Description (100% missing / 180,519), Order Zipcode (86.22% missing / 155,679), Customer Lname (8 missing), Customer Zipcode (3 missing).",
          "Confirms multi-item order grain: 65,752 unique Order IDs vs 180,519 unique Order Item IDs (~2.75 items per order)."
        ]
      },
      {
        name: "Activity 1.3: Target Variable & Initial Risk Cross-Tabulations",
        cells: "Cells 12 – 35",
        points: [
          "Evaluates Late_delivery_risk balance: Class 1 (Late) = 98,977 (54.83%) vs Class 0 (On-Time) = 81,542 (45.17%).",
          "Parses order date (DateOrders) into datetime and cross-tabulates Late_delivery_risk by Shipping Mode, Order Region (23 regions), and Product Category (50 categories).",
          "Exports initial summary tables to the results/ directory."
        ]
      }
    ],
    tableTitle: "Initial Missing Value & Cardinality Summary (Cells 8–10)",
    tableHeaders: ["Column / Entity", "Missing Count", "Missing %", "Unique Values", "Pipeline Decision"],
    tableRows: [
      ["Product Description", "180,519", "100.00%", "0", "Drop (Completely empty column)"],
      ["Order Zipcode", "155,679", "86.22%", "609", "Drop (Excessive missingness > 85%)"],
      ["Customer Lname", "8", "0.0044%", "11,093", "Drop (PII — personal name)"],
      ["Customer Zipcode", "3", "0.0017%", "995", "Impute / exclude in refinement"],
      ["Order Id", "0", "0.00%", "65,752", "Group-split key & Lens 2 aggregation ID"],
      ["Order Item Id", "0", "0.00%", "180,519", "Row identifier (excluded from features)"]
    ]
  },
  {
    id: 2,
    title: "Comprehensive Exploratory Data Analysis (EDA)",
    cellRange: "Cells 36 – 151",
    startCell: 36,
    endCell: 151,
    badgeColor: "cyan",
    shortDesc: "Deep univariate & bivariate exploration of numeric distributions, shipping modes, 5 global markets, 23 regions, temporal rhythms, and ID structure.",
    friendlyTakeaway: "Shipping Mode is the single strongest driver of late deliveries: First Class (1-day promised SLA) is late 95.32% of the time, and Second Class (2-day SLA) is late 76.63% of the time, whereas Standard Class (4-day SLA, making up 60% of all orders) is late only 38.07% of the time.",
    overview: "Performs exhaustive visual and statistical EDA across all candidate feature domains: numerical distributions and skewness, Shipping Mode volumes and late rates, Customer Segments (Consumer, Corporate, Home Office), Markets (LATAM, Europe, Pacific Asia, USCA, Africa), Order Regions, Product Departments & Categories, temporal cycles (month, weekday, hour), and Order ID range behavior.",
    metrics: [
      { label: "First Class Late Rate", value: "95.32%" },
      { label: "Second Class Late Rate", value: "76.63%" },
      { label: "Same Day Late Rate", value: "45.83%" },
      { label: "Standard Class Late Rate", value: "38.07%" }
    ],
    activities: [
      {
        name: "Activity 2.1: Numerical & Categorical Distribution Profiling",
        cells: "Cells 36 – 89",
        points: [
          "Generates histograms for all numerical features (excluding IDs and target) to inspect skewness, discrete steps, and value scales.",
          "Maps volume distribution across 4 Shipping Modes (Standard Class 59.69%, Second Class 19.51%, First Class 15.41%, Same Day 5.39%).",
          "Profiles 3 Customer Segments (Consumer 51.8%, Corporate 30.3%, Home Office 17.9%), 5 Markets, 23 Order Regions, 11 Departments, and Top 15 Categories."
        ]
      },
      {
        name: "Activity 2.2: Bivariate Late-Delivery Risk Analysis",
        cells: "Cells 90 – 119",
        points: [
          "Reveals dramatic late-delivery divergence across Shipping Modes: First Class (~95.3% late), Second Class (~76.6% late), Same Day (~45.8% late), Standard Class (~38.1% late).",
          "Compares Scheduled Shipping Days (0, 1, 2, 4 days) against observed late rates.",
          "Analyzes temporal patterns across order month, day of week, and hour of day."
        ]
      },
      {
        name: "Activity 2.3: Geographic Match & Order ID Decile Investigation",
        cells: "Cells 120 – 151",
        points: [
          "Compares Customer Country (Puerto Rico & EE. UU. only) vs Order Country (164 destination countries).",
          "Divides Order Id and Order Item Id into 10 decile bins to test whether sequential ID ranges exhibit target drift or structural boundaries."
        ]
      }
    ],
    tableTitle: "Shipping Mode Distribution & Observed Late-Delivery Risk (Cells 19–22, 93)",
    tableHeaders: ["Shipping Mode", "Scheduled Days", "Order-Line Share", "On-Time Rate (%)", "Late Delivery Rate (%)", "Risk Profile"],
    tableRows: [
      ["First Class", "1 Day", "15.41%", "4.68%", "95.32%", "Extreme Risk — Tight 1-day SLA frequently missed"],
      ["Second Class", "2 Days", "19.51%", "23.37%", "76.63%", "High Risk — 2-day SLA often exceeded"],
      ["Same Day", "0 Days", "5.39%", "54.17%", "45.83%", "Moderate Risk — Near 50/50 split"],
      ["Standard Class", "4 Days", "59.69%", "61.93%", "38.07%", "Lower Baseline Risk — Largest volume (60% of lines)"]
    ]
  },
  {
    id: 3,
    title: "Feature Availability, PII & Data Leakage Audit",
    cellRange: "Cells 152 – 263",
    startCell: 152,
    endCell: 263,
    badgeColor: "amber",
    shortDesc: "Rigorous prediction-point audit at Order Placement Time: removing post-order leakage, PII, identifiers, and exact mathematical duplicates.",
    friendlyTakeaway: "To build a trustworthy model that works in the real world at checkout time, we remove all future/post-shipment columns (like real shipping days and delivery status), personal customer data (emails, passwords, names), and duplicate financial columns. We also prove that every item in the same order always shares the same late/on-time outcome.",
    overview: "Establishes the exact prediction point as the moment an order is placed. Every column across 7 domains (Customer, Order, Product, Order-Item, Shipping, Time, Geography) is audited for prediction-time availability, PII compliance, mathematical redundancy, and target leakage. Also verifies 100% target consistency across items within the same Order Id.",
    metrics: [
      { label: "Prediction Point", value: "Order Placement" },
      { label: "Order Target Consistency", value: "100% (0 conflicts)" },
      { label: "Multi-Item Orders", value: "69.81% of orders" },
      { label: "Canceled/Fraud Late Rate", value: "0.00% (7,754 rows)" }
    ],
    activities: [
      {
        name: "Activity 3.1: Prediction-Point Availability & PII Screening",
        cells: "Cells 152 – 179",
        points: [
          "Excludes PII fields: Customer Email, Customer Fname, Customer Lname, Customer Password, Customer Street, Product Image.",
          "Excludes raw arbitrary IDs from predictors: Customer Id, Order Customer Id, Category Id, Department Id, Product Card Id, Product Category Id, Order Item Cardprod Id."
        ]
      },
      {
        name: "Activity 3.2: Financial Redundancy & Correlation Proof",
        cells: "Cells 180 – 193",
        points: [
          "Proves exact mathematical equivalence (r = 1.0000, max diff = 0.0) between duplicate commercial columns:",
          "Benefit per order == Order Profit Per Order; Sales per customer == Order Item Total; Order Item Product Price == Product Price.",
          "Verifies Sales = Product Price × Quantity and Order Item Total = Sales - Discount."
        ]
      },
      {
        name: "Activity 3.3: Post-Order Target Leakage & Order Grain Verification",
        cells: "Cells 194 – 263",
        points: [
          "Identifies direct post-order leakage: Days for shipping (real), shipping date (DateOrders), and Delivery Status (which directly encodes Late delivery / Advance shipping / Shipping on time / Shipping canceled).",
          "Investigates Order Status: discovers all 3,692 CANCELED and 4,062 SUSPECTED_FRAUD rows (4.29% of dataset) have Late_delivery_risk = 0; excludes Order Status as post-order lifecycle state.",
          "Proves 100% target consistency within each Order Id across all 65,752 orders—mandating group-aware splitting by Order Id."
        ]
      }
    ],
    tableTitle: "Leakage, Redundancy & PII Audit Decisions (Cells 152–258)",
    tableHeaders: ["Feature Group / Columns", "Audit Category", "Empirical Evidence", "Action"],
    tableRows: [
      ["Delivery Status, Days for shipping (real), shipping date", "Direct Target Leakage", "Known only after shipment/delivery completes", "Excluded"],
      ["Order Status (CANCELED, SUSPECTED_FRAUD, COMPLETE...)", "Lifecycle State Leakage", "7,754 canceled/fraud rows have 100% Late_delivery_risk = 0", "Excluded"],
      ["Customer Email, Fname, Lname, Password, Street", "PII / Privacy Risk", "Personal identifiers with no generalizable signal", "Excluded"],
      ["Benefit per order, Sales per customer, Order Item Product Price", "100% Redundant Duplicates", "Exact copies of Order Profit Per Order, Order Item Total, Product Price", "Excluded"],
      ["Days for shipment (scheduled), Shipping Mode", "Valid Planned SLA", "Known at checkout / order placement time", "Retained"]
    ]
  },
  {
    id: 4,
    title: "Group-Aware Data Splitting & Preprocessing Pipeline",
    cellRange: "Cells 264 – 297",
    startCell: 264,
    endCell: 297,
    badgeColor: "purple",
    shortDesc: "Order-ID grouped Train/Val/Test split (85% / 7.5% / 7.5%), cyclical & interaction feature engineering, Frequency + One-Hot encoding (609 features).",
    friendlyTakeaway: "Because a single order can have up to 5 items, a random row split would leak items from the same order into both training and testing. We split strictly by Order ID (55,888 Train orders, 4,932 Validation orders, 4,932 Test orders) and fit all feature encodings exclusively on the training data.",
    overview: "Implements a strict two-stage GroupShuffleSplit by Order Id so items from the same order never cross between Train, Validation, and Test sets. Conducts post-split feature refinement and engineering fitted strictly on the 153,594 training records: cyclical time transforms, domain interaction features, Frequency Encoding for high-cardinality cities/states, One-Hot Encoding for standard categoricals, and Variance + Mutual Information screening.",
    metrics: [
      { label: "Training Split (85%)", value: "153,594 lines (55,888 orders)" },
      { label: "Validation Split (7.5%)", value: "13,547 lines (4,932 orders)" },
      { label: "Unseen Test Split (7.5%)", value: "13,378 lines (4,932 orders)" },
      { label: "Encoded Feature Space", value: "609 / 611 features" }
    ],
    activities: [
      {
        name: "Activity 4.1: Strict Order-Level Group Splitting",
        cells: "Cells 264 – 273",
        points: [
          "Separates 7.5% of unique orders (4,932 orders / 13,378 lines) as the locked Test Set first.",
          "Separates 4,932 unique orders (13,547 lines) from the remaining pool as the Validation Set, leaving 55,888 unique orders (153,594 lines) for Training.",
          "Verifies 0 overlapping Order IDs across Train, Validation, and Test sets and confirms ~54.8% positive class balance across all 3 splits."
        ]
      },
      {
        name: "Activity 4.2: Feature Refinement & Interaction Engineering",
        cells: "Cells 274 – 286",
        points: [
          "Drops same_country (100% constant in training) and high-missing/redundant columns.",
          "Engineers cyclical time features (hour_sin, hour_cos, month_sin, month_cos, dayofweek_sin, dayofweek_cos) and interaction terms (region_shipping_mode, category_shipping_mode, discount_to_price_ratio, value_per_unit)."
        ]
      },
      {
        name: "Activity 4.3: Hybrid Encoding, Variance & Mutual Information Screening",
        cells: "Cells 287 – 297",
        points: [
          "Applies Frequency Encoding (learned on Train only) to high-cardinality geographic columns: Order City, Order State, Customer City.",
          "Applies One-Hot Encoding + StandardScaler/SimpleImputer pipeline to remaining features, yielding 609–611 encoded columns.",
          "Evaluates feature variance and Mutual Information scores on training data to rank predictive signals."
        ]
      }
    ],
    tableTitle: "Leakage-Free Group Split Summary (Cells 266–271)",
    tableHeaders: ["Dataset Split", "Unique Orders (Order Id)", "Order-Line Records", "Share of Orders", "Late Delivery Rate (%)", "Order ID Overlap"],
    tableRows: [
      ["Training Set", "55,888", "153,594", "85.00%", "54.81%", "0 shared orders"],
      ["Validation Set", "4,932", "13,547", "7.50%", "54.82%", "0 shared orders"],
      ["Unseen Test Set", "4,932", "13,378", "7.50%", "54.85%", "0 shared orders"],
      ["Total Dataset", "65,752", "180,519", "100.00%", "54.83%", "Verified disjoint"]
    ]
  },
  {
    id: 5,
    title: "5-Fold Cross-Validation Feature Selection",
    cellRange: "Cells 298 – 310",
    startCell: 298,
    endCell: 310,
    badgeColor: "emerald",
    shortDesc: "StratifiedGroupKFold (5 folds) comparing 100, 200, 305, 400, and 609 features — reducing dimensionality by 83.63% while boosting ROC-AUC by +0.0366.",
    friendlyTakeaway: "More features are not always better: testing 100, 200, 305, 400, and all 609+ encoded features across 5 cross-validation folds proves that keeping only the Top 100 features cuts 83.6% of noisy variables and boosts validation ROC-AUC from 0.7395 up to 0.7760.",
    overview: "Uses 5-fold StratifiedGroupKFold (grouped by Order Id) on the training set to evaluate Random Forest performance across 5 candidate feature subset sizes (100, 200, 305, 400, and 609 features). Feature rankings are computed strictly inside each training fold. Selecting the Top 100 features cuts dimensionality by 83.63% while increasing validation ROC-AUC from 0.7395 to 0.7760 (+0.0366).",
    metrics: [
      { label: "Original Encoded Features", value: "611" },
      { label: "Selected Feature Subset", value: "Top 100" },
      { label: "Dimensionality Reduction", value: "83.63%" },
      { label: "Validation ROC-AUC Gain", value: "+0.0366 (0.7760)" }
    ],
    activities: [
      {
        name: "Activity 5.1: 5-Fold StratifiedGroupKFold Subset Sweep",
        cells: "Cells 298 – 305",
        points: [
          "Evaluates 100, 200, 305, 400, and 609 feature subsets across 5 group-stratified folds.",
          "Demonstrates that Top 100 features achieves the highest Mean CV ROC-AUC (0.7673 ± 0.0073) and tied-highest Mean CV F1 (0.6950 ± 0.0085)."
        ]
      },
      {
        name: "Activity 5.2: Full-Feature (611) vs Top-100 Validation Benchmark",
        cells: "Cells 306 – 310",
        points: [
          "Compares Random Forest trained on all 611 features vs Top 100 features on the validation set.",
          "Validation Accuracy improves from 0.7086 → 0.7176 (+0.0090), Precision from 0.8303 → 0.8496 (+0.0193), F1 from 0.6933 → 0.7000 (+0.0066), and ROC-AUC from 0.7395 → 0.7760 (+0.0366).",
          "Locks in the Top 100 feature matrices for all downstream modeling."
        ]
      }
    ],
    tableTitle: "5-Fold StratifiedGroupKFold Feature Subset Comparison (Cell 300 & Cell 308)",
    tableHeaders: ["Requested Features", "5-Fold Mean F1", "5-Fold Std F1", "5-Fold Mean Recall", "5-Fold Mean ROC-AUC", "Selection Verdict"],
    tableRows: [
      ["100 Features (Selected)", "0.6950", "0.0085", "0.5843", "0.7673", "Optimal — Highest ROC-AUC & 83.6% reduction"],
      ["200 Features", "0.6950", "0.0085", "0.5843", "0.7583", "Lower ROC-AUC due to extra sparse dummies"],
      ["305 Features", "0.6950", "0.0085", "0.5843", "0.7462", "Diminishing returns from low-variance features"],
      ["400 Features", "0.6947", "0.0087", "0.5843", "0.7411", "Increased noise and training time"],
      ["609 / 611 (All Features)", "0.6927", "0.0068", "0.5843", "0.7383", "Baseline full space — Validation ROC-AUC 0.7395"]
    ]
  },
  {
    id: 6,
    title: "Baseline Machine Learning Models",
    cellRange: "Cells 311 – 369",
    startCell: 311,
    endCell: 369,
    badgeColor: "blue",
    shortDesc: "Benchmarking 4 core baseline classifiers (Logistic Regression, Decision Tree, Random Forest, LightGBM) on the 100 selected features.",
    friendlyTakeaway: "Before tuning hyperparameters, we benchmark five distinct machine learning families on the same Top-100 features. Tree-based and gradient-boosted models (LightGBM at 71.69% accuracy and Random Forest at 71.00%) outperform linear baselines by capturing non-linear interactions between Shipping Mode and geography.",
    overview: "Trains and evaluates diverse baseline model families on the identical 100-feature training matrix (153,594 rows) and evaluates them on the 13,547-row validation set: linear classification (Logistic Regression), single tree partitioning (Decision Tree), bagging ensemble (Random Forest), and gradient boosted trees (LightGBM), plus Linear SVM baseline introduced in Cell 412.",
    metrics: [
      { label: "Logistic Regression Baseline", value: "Acc 70.16% | AUC 0.7375" },
      { label: "Decision Tree Baseline", value: "Acc 70.61% | AUC 0.7524" },
      { label: "Random Forest Baseline", value: "Acc 71.00% | AUC 0.7590" },
      { label: "LightGBM Baseline", value: "Acc 71.69% | AUC 0.7796" }
    ],
    activities: [
      {
        name: "Activity 6.1: Logistic Regression & Coefficient Analysis",
        cells: "Cells 311 – 322",
        points: [
          "Trains baseline Logistic Regression (max_iter=1000) achieving Validation Accuracy 0.7016, Precision 0.8456, Recall 0.5565, F1 0.6712, ROC-AUC 0.7375.",
          "Extracts Top 20 positive and negative regression coefficients, showing strong weight on Shipping Mode indicators."
        ]
      },
      {
        name: "Activity 6.2: Decision Tree & Random Forest Baselines",
        cells: "Cells 323 – 346",
        points: [
          "Evaluates constrained Decision Tree baseline (Acc 0.7061 / 0.7173, F1 0.6816 / 0.7043, ROC-AUC 0.7524 / 0.7705) with Confusion Matrix, ROC, and PR curves.",
          "Trains Random Forest baseline achieving Validation Accuracy 0.7100 (0.7176 tuned config), Precision 0.8441, F1 0.6852, ROC-AUC 0.7590."
        ]
      },
      {
        name: "Activity 6.3: LightGBM Baseline & 4-Model Synthesis",
        cells: "Cells 347 – 369",
        points: [
          "Trains LightGBM baseline achieving the strongest single-baseline Validation Accuracy (0.7169), Recall (0.6009), F1 (0.7015), ROC-AUC (0.7796), and Average Precision (0.8414).",
          "Compiles multi-metric baseline comparison chart across all models."
        ]
      }
    ],
    tableTitle: "Baseline Model Validation Comparison (Cells 334, 346, 358, 412)",
    tableHeaders: ["Baseline Model", "Accuracy", "Precision", "Recall", "F1-Score", "ROC-AUC", "Avg Precision"],
    tableRows: [
      ["Logistic Regression (Baseline)", "0.7016", "0.8456", "0.5565", "0.6712", "0.7375", "0.8111"],
      ["Decision Tree (Baseline)", "0.7061", "0.8342", "0.5762", "0.6816", "0.7524", "0.8087"],
      ["Random Forest (Baseline)", "0.7100", "0.8441", "0.5766", "0.6852", "0.7590", "0.8261"],
      ["LightGBM (Baseline)", "0.7169", "0.8426", "0.6009", "0.7015", "0.7796", "0.8414"],
      ["Linear SVM (Baseline - Cell 412)", "0.7055", "0.8426", "0.5754", "0.6838", "0.7468", "0.8191"]
    ]
  },
  {
    id: 7,
    title: "Hyperparameter Tuning & Model Optimization",
    cellRange: "Cells 370 – 418",
    startCell: 370,
    endCell: 418,
    badgeColor: "indigo",
    shortDesc: "5-Fold StratifiedGroupKFold GridSearchCV & RandomizedSearchCV across all 5 model families (F1 & Accuracy optimization experiments).",
    friendlyTakeaway: "Each of the 5 models is systematically tuned using 5-fold group-aware cross-validation (GridSearchCV for simpler models, RandomizedSearchCV for Random Forest & LightGBM), and Linear SVM is probability-calibrated so all 5 models can vote together.",
    overview: "Conducts systematic hyperparameter tuning using 5-fold StratifiedGroupKFold so order groups remain isolated during cross-validation. Employs GridSearchCV for compact search spaces (Logistic Regression, Decision Tree, Linear SVM) and RandomizedSearchCV for expensive ensemble spaces (Random Forest, LightGBM), testing both F1-score (Experiment 1) and Accuracy (Experiment 2) objectives.",
    metrics: [
      { label: "Tuned Logistic Regression", value: "C=0.01 | Val Acc 70.98%" },
      { label: "Tuned Decision Tree", value: "depth=10 | Val Acc 71.73%" },
      { label: "Tuned Random Forest", value: "Val Acc 71.76% | AUC 0.7763" },
      { label: "Tuned LightGBM", value: "Val F1 0.7078 | AUC 0.7748" }
    ],
    activities: [
      {
        name: "Activity 7.1: Dual-Objective Logistic Regression & Decision Tree Tuning",
        cells: "Cells 370 – 391",
        points: [
          "Evaluates Logistic Regression across C ∈ [0.01, 0.1, 1, 10, 100] and class_weight ∈ [None, 'balanced'] under both F1 (Exp 1) and Accuracy (Exp 2) objectives; both converge on C = 0.01, class_weight = None (CV Acc 0.7102, Val Acc 0.7098).",
          "Refines Decision Tree max_depth, min_samples_split, and min_samples_leaf, improving Validation Accuracy to 0.7173 and Precision to 0.8495."
        ]
      },
      {
        name: "Activity 7.2: Random Forest & LightGBM RandomizedSearchCV",
        cells: "Cells 392 – 410",
        points: [
          "Runs 5-fold group-aware RandomizedSearchCV on Random Forest (n_estimators, max_depth, min_samples_split, min_samples_leaf, max_features), reaching Val Accuracy 0.7176, Precision 0.8496, ROC-AUC 0.7763.",
          "Tunes LightGBM (num_leaves, max_depth, learning_rate, n_estimators, subsample, colsample_bytree), achieving the highest single-model Validation F1-score of 0.7078 and Recall of 0.6272."
        ]
      },
      {
        name: "Activity 7.3: Linear SVM Introduction, Tuning & Calibration Strategy",
        cells: "Cells 411 – 418",
        points: [
          "Introduces LinearSVC as a margin-maximizing fifth model family and tunes C & class_weight across 40 model fits (best: C = 0.01, class_weight = None, Val Acc 70.78%).",
          "Synthesizes all 5 tuned models and establishes the rationale for soft-voting probability ensembling."
        ]
      }
    ],
    tableTitle: "Tuned Individual Models vs Final Ensemble — Validation Set (Cell 480)",
    tableHeaders: ["Tuned Model Family", "Optimal Key Hyperparameters", "Accuracy", "Precision", "Recall", "F1-Score", "ROC-AUC", "Avg Precision"],
    tableRows: [
      ["Logistic Regression (Tuned)", "C=0.01, class_weight=None", "0.7098", "0.8440", "0.5837", "0.6901", "0.7481", "0.8197"],
      ["Decision Tree (Tuned)", "max_depth=10, min_samples_leaf=20", "0.7173", "0.8495", "0.5946", "0.6996", "0.7752", "0.8032"],
      ["Random Forest (Tuned)", "RandomizedSearchCV (100 features)", "0.7176", "0.8496", "0.5951", "0.7000", "0.7763", "0.8383"],
      ["LightGBM (Tuned)", "RandomizedSearchCV boosted trees", "0.7134", "0.8123", "0.6272", "0.7078", "0.7748", "0.8383"],
      ["Linear SVM (Tuned + Calibrated)", "C=0.01 + Sigmoid Calibration (CV=5)", "0.7078", "0.8396", "0.5835", "0.6885", "0.7470", "0.8194"],
      ["5-Model Soft-Voting Ensemble (Exp 2)", "Equal Weights (20% each), Thr=0.50", "0.7178", "0.8497", "0.5955", "0.7003", "0.7762", "0.8351"]
    ]
  },
  {
    id: 8,
    title: "Lens 1 — Soft-Voting Ensemble & Threshold Optimization",
    cellRange: "Cells 419 – 445",
    startCell: 419,
    endCell: 445,
    badgeColor: "emerald",
    shortDesc: "Comparing Experiment 1 (4-Model Ensemble) vs Experiment 2 (5-Model Soft-Voting Ensemble with Calibrated SVM) and threshold optimization (0.20–0.80).",
    friendlyTakeaway: "Combining all 5 tuned models with equal 20% voting weights produces our most reliable predictor (71.78% validation accuracy, 84.97% precision). We choose a 0.50 threshold rather than 0.35 so operations teams aren't flooded with false alarms.",
    overview: "Constructs and compares two soft-voting ensembles: Experiment 1 (Logistic Regression + Decision Tree + Random Forest + LightGBM) and Experiment 2 (adding Calibrated Linear SVM via CalibratedClassifierCV for a 5-model equal-weight 20% ensemble). Performs a comprehensive threshold sweep from 0.20 to 0.80, selecting threshold 0.50 to balance high precision (84.97%) and accuracy (71.78%).",
    metrics: [
      { label: "Ensemble Architecture", value: "5 Models (20% weight each)" },
      { label: "Validation Accuracy", value: "71.78% (highest)" },
      { label: "Validation Precision", value: "84.97% (highest)" },
      { label: "Selected Operating Threshold", value: "0.50 (vs 0.35 F1-max)" }
    ],
    activities: [
      {
        name: "Activity 8.1: Experiment 1 (4 Models) vs Experiment 2 (5 Models)",
        cells: "Cells 419 – 436",
        points: [
          "Calibrates tuned Linear SVM using CalibratedClassifierCV so it outputs well-behaved probability estimates.",
          "Combines all 5 models via equal-weight (20%) soft voting; Experiment 2 achieves the highest Validation Accuracy (0.7178) and Precision (0.8497), outperforming Experiment 1 (+0.0001 Acc, +0.0002 Prec, +0.0001 F1)."
        ]
      },
      {
        name: "Activity 8.2: Threshold Sweep & Operating Point Selection",
        cells: "Cells 437 – 445",
        points: [
          "Evaluates 13 decision thresholds from 0.20 to 0.80 in increments of 0.05.",
          "Notes that while threshold 0.35 maximizes F1 (0.7347) via high recall (0.9175), it drops precision to 0.6126 and accuracy to 0.6332 (causing excessive false alarms).",
          "Selects threshold 0.50 as the balanced operating threshold (Accuracy 0.7178, Precision 0.8497, Recall 0.5955, F1 0.7003)."
        ]
      }
    ],
    tableTitle: "Experiment 2 Validation Threshold Optimization Sweep (Cell 438)",
    tableHeaders: ["Threshold", "Accuracy", "Precision", "Recall", "F1-Score", "Operational Trade-off"],
    tableRows: [
      ["0.25", "0.5831", "0.5704", "0.9997", "0.7264", "Near-100% recall but 43% false alarm rate"],
      ["0.30 (Low Risk Cutoff)", "0.5880", "0.5739", "0.9931", "0.7274", "Used in Lens 2 as Low-Risk boundary"],
      ["0.35 (Max F1 Point)", "0.6332", "0.6126", "0.9175", "0.7347", "Highest F1, but accuracy drops by 8.46%"],
      ["0.40", "0.6852", "0.7006", "0.7532", "0.7259", "Moderate recall/precision compromise"],
      ["0.45", "0.7169", "0.8419", "0.6015", "0.7017", "Transition to high-precision regime"],
      ["0.50 (Selected Operating Threshold)", "0.7178", "0.8497", "0.5955", "0.7003", "Optimal Accuracy (71.78%) & High Precision (84.97%)"],
      ["0.65 (High Risk Cutoff)", "0.7171", "0.8498", "0.5939", "0.6992", "Used in Lens 2 as High-Risk boundary"],
      ["0.75", "0.6937", "0.8762", "0.5202", "0.6528", "Conservative high-precision / low-recall regime"]
    ]
  },
  {
    id: 9,
    title: "Error Analysis, Calibration & Multi-Model Feature Importance",
    cellRange: "Cells 446 – 488",
    startCell: 446,
    endCell: 488,
    badgeColor: "amber",
    shortDesc: "Granular validation error breakdown by Shipping Mode, Market, and Customer Segment, plus cross-model feature importance & probability calibration.",
    friendlyTakeaway: "Deep error analysis uncovers our most important diagnostic finding: 100% of the model's missed late deliveries (3,033 False Negatives) happen inside Standard Class shipments, while Same Day shipments achieve 97.74% accuracy and First Class achieves 94.29% accuracy.",
    overview: "Re-aligns validation predictions with original business metadata (13,547 rows) to diagnose where and why errors occur. Discovers a critical structural insight: all 3,033 validation False Negatives occur in Standard Class shipments, while First Class and Second Class have zero False Negatives. Synthesizes feature importances across all 5 tuned models and evaluates probability calibration curves.",
    metrics: [
      { label: "Validation True Positives", value: "4,466 (32.97%)" },
      { label: "Validation True Negatives", value: "5,258 (38.81%)" },
      { label: "Validation False Negatives", value: "3,033 (100% Standard Class)" },
      { label: "Validation False Positives", value: "790 (5.83%)" }
    ],
    activities: [
      {
        name: "Activity 9.1: Validation Error Diagnosis by Shipping Mode, Market & Segment",
        cells: "Cells 446 – 469",
        points: [
          "Recovers original validation records and verifies 100% row alignment.",
          "Shipping Mode Error Discovery: First Class (2,132 TP, 129 FP, 0 FN — 94.29% correct); Second Class (2,008 TP, 644 FP, 0 FN — 75.72% correct); Same Day (323 TP, 412 TN, 17 FP, 0 FN — 97.74% correct!); Standard Class (4,846 TN, 3 TP, 3,033 FN — 38.48% FN rate).",
          "Market Error Analysis: Error rates remain stable across global markets (Africa 24.67% total error, USCA 27.52%, Europe 27.29%, Pacific Asia 28.84%, LATAM 29.79%)."
        ]
      },
      {
        name: "Activity 9.2: Cross-Model Feature Importance Consensus",
        cells: "Cells 470 – 479",
        points: [
          "Extracts and plots Top 15 features for each of the 5 tuned models (LR coefficients, DT Gini importance, RF importance, LightGBM split importance, Linear SVM coefficients).",
          "Computes normalized ensemble feature importance consensus: Shipping Mode indicators and region×shipping_mode / category×shipping_mode interactions dominate predictive power, supplemented by temporal (order_hour, cyclical time) and frequency-encoded city features."
        ]
      },
      {
        name: "Activity 9.3: Probability Calibration & Threshold Diagnostics",
        cells: "Cells 480 – 488",
        points: [
          "Plots reliability / calibration curves and predicted probability distributions across decile bins.",
          "Implements final feature alignment safety checks and locks the 5-model prediction pipeline before touching the unseen test set."
        ]
      }
    ],
    tableTitle: "Validation Error Distribution by Shipping Mode at Threshold 0.50 (Cells 463–465)",
    tableHeaders: ["Shipping Mode", "True Positive (TP)", "True Negative (TN)", "False Positive (FP)", "False Negative (FN)", "Mode Accuracy (%)", "Diagnostic Insight"],
    tableRows: [
      ["First Class", "2,132 (94.29%)", "0 (0.00%)", "129 (5.71%)", "0 (0.00%)", "94.29%", "Model predicts all as late; 94.3% are truly late"],
      ["Same Day", "323 (42.95%)", "412 (54.79%)", "17 (2.26%)", "0 (0.00%)", "97.74%", "Exceptionally accurate separation (only 2.26% FP, 0% FN)"],
      ["Second Class", "2,008 (75.72%)", "0 (0.00%)", "644 (24.28%)", "0 (0.00%)", "75.72%", "High recall capture; 24.3% false alarms"],
      ["Standard Class", "3 (0.04%)", "4,846 (61.48%)", "0 (0.00%)", "3,033 (38.48%)", "61.52%", "Accounts for 100% of validation False Negatives (3,033)"]
    ]
  },
  {
    id: 10,
    title: "Lens 1 — Final Unseen Test Evaluation (Order-Line Level)",
    cellRange: "Cells 489 – 493",
    startCell: 489,
    endCell: 493,
    badgeColor: "rose",
    shortDesc: "Evaluating the locked 5-Model Soft-Voting Ensemble on 13,378 unseen test order lines: 71.69% Accuracy, 84.81% Precision, 0.7675 ROC-AUC.",
    friendlyTakeaway: "When tested on 13,378 completely unseen order lines, the 5-model ensemble achieves 71.69% accuracy and 84.81% precision—virtually identical to validation (within 0.09%), proving zero overfitting.",
    overview: "Executes the locked Experiment 2 Five-Model Soft-Voting Ensemble on the 13,378 unseen test order-line records. The test results closely match validation performance (Test Accuracy 71.69% vs Val 71.78%, Test Precision 84.81% vs Val 84.97%, Test ROC-AUC 0.7675 vs Val 0.7762), confirming strong generalization and zero overfitting.",
    metrics: [
      { label: "Test Order-Line Accuracy", value: "71.69% (13,378 lines)" },
      { label: "Test Precision", value: "84.81%" },
      { label: "Test Recall & F1", value: "58.95% Rec | 69.56% F1" },
      { label: "Test ROC-AUC & PR-AUC", value: "0.7675 AUC | 0.8303 AP" }
    ],
    activities: [
      {
        name: "Activity 10.1: Unseen Test Set Probability & Class Prediction",
        cells: "Cells 489 – 492",
        points: [
          "Defines the reusable ensemble probability function combining 20% × (LR + DT + RF + LGBM + Calibrated Linear SVM).",
          "Generates predictions for all 13,378 unseen test order lines at threshold 0.50."
        ]
      },
      {
        name: "Activity 10.2: Comprehensive Test Metrics, Confusion Matrix & Curves",
        cells: "Cells 493",
        points: [
          "Computes classification and probabilistic calibration metrics: Accuracy = 0.7169, Precision = 0.8481, Recall = 0.5895, F1 = 0.6956, ROC-AUC = 0.7675, Average Precision = 0.8303, Brier Score = 0.1854, Log Loss = 0.5407.",
          "Confusion Matrix on 13,378 test lines: 5,265 True Negatives, 775 False Positives, 3,012 False Negatives, 4,326 True Positives."
        ]
      }
    ],
    tableTitle: "Lens 1 Final Ensemble Generalization: Validation vs Unseen Test (Cell 493 & Cell 507)",
    tableHeaders: ["Evaluation Metric", "Validation Set (13,547 lines)", "Unseen Test Set (13,378 lines)", "Generalization Delta", "Assessment"],
    tableRows: [
      ["Accuracy", "0.7178 (71.78%)", "0.7169 (71.69%)", "-0.0009 (-0.09%)", "Highly stable generalization"],
      ["Precision", "0.8497 (84.97%)", "0.8481 (84.81%)", "-0.0016 (-0.16%)", "84.8% of predicted late lines are truly late"],
      ["Recall", "0.5955 (59.55%)", "0.5895 (58.95%)", "-0.0060 (-0.60%)", "Captures ~59% of late deliveries at thr 0.50"],
      ["F1-Score", "0.7003 (70.03%)", "0.6956 (69.56%)", "-0.0047 (-0.47%)", "Consistent harmonic mean across splits"],
      ["ROC-AUC", "0.7762", "0.7675", "-0.0087", "Consistent ranking discrimination"],
      ["Average Precision (PR-AUC)", "0.8351", "0.8303", "-0.0048", "Strong precision-recall curve area"],
      ["Brier Score / Log Loss", "—", "0.1854 / 0.5407", "—", "Well-behaved probability estimates"]
    ]
  },
  {
    id: 11,
    title: "Lens 2 — Shipment Risk Profiling & Business Prioritization",
    cellRange: "Cells 494 – 503",
    startCell: 494,
    endCell: 503,
    badgeColor: "emerald",
    shortDesc: "Aggregating line probabilities to 4,932 unique orders, risk banding (Low <0.30, Med 0.30–0.65, High ≥0.65), and Monetary Impact × Risk prioritization.",
    friendlyTakeaway: "Lens 2 turns raw ML probabilities into a practical tool for supply chain managers. By grouping items into 4,932 unique orders and combining delivery risk with dollar order value, it isolates 575 'Urgent' orders (only 11.66% of the workload) where 83.83% are genuinely late and 20.63% of total revenue is at stake.",
    overview: "Translates Lens 1 machine learning probabilities into an actionable order-level supply chain decision system (Lens 2). Aggregates order-line probabilities by Order Id to form one unified risk score and total monetary value per unique order (4,932 validation orders and 4,932 test orders). Combines 3 Risk Bands with training-derived Monetary Value Quantiles ($314.55 and $625.71) to assign operational priorities: Low, Medium, and Urgent.",
    metrics: [
      { label: "Low Risk (<0.30) Late Rate", value: "9.65% (228 orders)" },
      { label: "Medium Risk (0.30–0.65)", value: "38.42% (2,816 orders)" },
      { label: "High Risk (≥0.65) Late Rate", value: "85.28% (1,888 orders)" },
      { label: "Urgent Tier (11.66% workload)", value: "83.83% Late | 20.63% Value" }
    ],
    activities: [
      {
        name: "Activity 11.1: Risk Band Profiling & Order-Level Aggregation",
        cells: "Cells 494 – 497",
        points: [
          "Categorizes predicted probabilities into Low Risk (< 0.30), Medium Risk (0.30 to < 0.65), and High Risk (≥ 0.65).",
          "Verifies 100% order completeness (no order split across partitions) and aggregates line-level predictions to unique orders via mean probability and sum of order-line monetary values."
        ]
      },
      {
        name: "Activity 11.2: Training-Derived Monetary Impact Thresholds",
        cells: "Cells 498 – 500",
        points: [
          "Computes 33rd and 66th percentile order-value thresholds strictly from the 55,888 training orders to avoid test leakage:",
          "Low Monetary Impact: < $314.55 | Medium Monetary Impact: $314.55 to < $625.71 | High Monetary Impact: ≥ $625.71.",
          "Combines Risk Band × Monetary Impact Tier into 3 Operational Priorities: Urgent (High Risk + High Monetary Impact), Medium, and Low."
        ]
      },
      {
        name: "Activity 11.3: Unseen Test Order-Level & Priority Evaluation",
        cells: "Cells 501 – 503",
        points: [
          "Evaluates 4,932 unique test orders ($2,436,978.03 total value): observed late rate rises monotonically from 9.65% (Low Risk) → 38.42% (Medium Risk) → 85.28% (High Risk).",
          "Urgent Priority isolates 575 orders (11.66% of workload) with an 83.83% actual late-delivery rate and $502,693 in order value (20.63% of total test revenue exposure)."
        ]
      }
    ],
    tableTitle: "Lens 2 Test Risk Bands & Operational Priority Performance (4,932 Unique Test Orders, Cells 502–507)",
    tableHeaders: ["Category / Tier", "Total Orders", "Actual Late Orders", "Observed Late Rate", "Workload Share", "Late-Order Capture", "Monetary Value Share"],
    tableRows: [
      ["Risk Band: Low (< 0.30)", "228", "22", "9.65%", "4.62%", "0.81%", "—"],
      ["Risk Band: Medium (0.30 – 0.65)", "2,816", "1,082", "38.42%", "57.10%", "39.87%", "—"],
      ["Risk Band: High (≥ 0.65)", "1,888", "1,610", "85.28%", "38.28%", "59.32%", "—"],
      ["Priority: Low (Routine Tracking)", "1,114", "380", "34.11%", "22.59%", "14.00%", "8.67% ($211.3K)"],
      ["Priority: Medium (Enhanced Review)", "3,243", "1,852", "57.11%", "65.75%", "68.24%", "70.70% ($1,723.0K)"],
      ["Priority: Urgent (Immediate Escalation)", "575", "482", "83.83%", "11.66%", "17.76%", "20.63% ($502.7K)"]
    ]
  },
  {
    id: 12,
    title: "Integrated Lens 1 + Lens 2 End-to-End Evaluation & Synthesis",
    cellRange: "Cells 504 – 508",
    startCell: 504,
    endCell: 508,
    badgeColor: "purple",
    shortDesc: "End-to-end connected pipeline verification: comparing Order-Line (13,378) vs Unique-Order (4,932) performance (72.00% Acc, 0.7734 AUC) and executive synthesis.",
    friendlyTakeaway: "Connecting Lens 1 directly into Lens 2 proves that evaluating at the customer-order level (4,932 unique orders) improves every single metric over individual item lines—reaching 72.00% Accuracy, 85.25% Precision, 70.01% F1, and 0.7734 ROC-AUC.",
    overview: "Connects Lens 1 (13,378 test order lines) directly into Lens 2 (4,932 unique test orders) in an automated end-to-end verification pipeline with programmatic assertions. Demonstrates that aggregating line-level probabilities to the unique-order level improves every single evaluation metric (Accuracy 71.69% → 72.00%, Precision 84.81% → 85.25%, Recall 58.95% → 59.40%, F1 69.56% → 70.01%, ROC-AUC 0.7675 → 0.7734, Brier Score 0.1854 → 0.1838). Concludes with a comprehensive project summary and deployment roadmap.",
    metrics: [
      { label: "Order-Level Test Accuracy", value: "72.00% (+0.31% vs lines)" },
      { label: "Order-Level Test Precision", value: "85.25% (+0.44% vs lines)" },
      { label: "Order-Level Test ROC-AUC", value: "0.7734 (+0.0059 vs lines)" },
      { label: "Total Test Order Value", value: "$2,436,978.03" }
    ],
    activities: [
      {
        name: "Activity 12.1: Automated End-to-End Connection & Integrity Assertions",
        cells: "Cells 504 – 505",
        points: [
          "Executes programmatic assertions verifying feature alignment, order completeness, threshold consistency (0.50), and exact probability match between Lens 1 and Lens 2.",
          "Evaluates and plots side-by-side Confusion Matrices, ROC curves, and Precision-Recall curves comparing Lens 1 (13,378 order lines) vs Lens 2 (4,932 unique orders)."
        ]
      },
      {
        name: "Activity 12.2: Connected Business Priority Audit & Final Project Report",
        cells: "Cells 506 – 508",
        points: [
          "Produces final connected risk-band and operational-priority summary tables and workload vs late-rate charts.",
          "Synthesizes final conclusions, Shipping Mode dependency analysis, limitations (recall ceiling at 59%, Standard Class false negatives, uncalibrated order-mean probabilities), and recommendations for production deployment."
        ]
      }
    ],
    tableTitle: "Integrated End-to-End Test Performance: Lens 1 (Order Lines) vs Lens 2 (Unique Orders) (Cell 505 & Cell 507)",
    tableHeaders: ["Metric", "Lens 1 — Order Lines (13,378)", "Lens 2 — Unique Orders (4,932)", "Order-Level Improvement", "Confusion Matrix (Unique Orders)"],
    tableRows: [
      ["Accuracy", "0.7169 (71.69%)", "0.7200 (72.00%)", "+0.0031 (+0.31%)", "TN = 1,939 | FP = 279"],
      ["Precision", "0.8481 (84.81%)", "0.8525 (85.25%)", "+0.0044 (+0.44%)", "FN = 1,102 | TP = 1,612"],
      ["Recall", "0.5895 (58.95%)", "0.5940 (59.40%)", "+0.0045 (+0.45%)", "Actual Late Orders = 2,714"],
      ["F1-Score", "0.6956 (69.56%)", "0.7001 (70.01%)", "+0.0045 (+0.45%)", "Actual On-Time Orders = 2,218"],
      ["ROC-AUC", "0.7675", "0.7734", "+0.0059", "Stronger ranking at order grain"],
      ["Average Precision", "0.8303", "0.8344", "+0.0041", "Improved precision-recall area"],
      ["Brier Score / Log Loss", "0.1854 / 0.5407", "0.1838 / 0.5371", "-0.0016 / -0.0036", "Lower error via line averaging"]
    ]
  }
];

const THRESHOLD_SWEEP_DATA = [
  { threshold: 0.20, accuracy: 0.5624, precision: 0.5585, recall: 1.0000, f1: 0.7167, note: "Extreme Recall: flags almost everything as late (44% false alarms)." },
  { threshold: 0.25, accuracy: 0.5831, precision: 0.5704, recall: 0.9997, f1: 0.7264, note: "Very High Recall (99.97%), low precision (57.04%)." },
  { threshold: 0.30, accuracy: 0.5880, precision: 0.5739, recall: 0.9931, f1: 0.7274, note: "Lens 2 Low-Risk Boundary (< 0.30 has only 9.65% actual late orders)." },
  { threshold: 0.35, accuracy: 0.6332, precision: 0.6126, recall: 0.9175, f1: 0.7347, note: "Maximum Validation F1-Score (0.7347), but accuracy is only 63.32%." },
  { threshold: 0.40, accuracy: 0.6852, precision: 0.7006, recall: 0.7532, f1: 0.7259, note: "Balanced transition zone between F1-optimal and Accuracy-optimal." },
  { threshold: 0.45, accuracy: 0.7169, precision: 0.8419, recall: 0.6015, f1: 0.7017, note: "High precision jumps to 84.19% as Standard Class noise is filtered." },
  { threshold: 0.50, accuracy: 0.7178, precision: 0.8497, recall: 0.5955, f1: 0.7003, note: "SELECTED OPERATING THRESHOLD: Maximum Validation Accuracy (71.78%) & 84.97% Precision." },
  { threshold: 0.55, accuracy: 0.7176, precision: 0.8496, recall: 0.5951, f1: 0.7000, note: "Stable plateau matching 0.50 performance." },
  { threshold: 0.60, accuracy: 0.7176, precision: 0.8498, recall: 0.5951, f1: 0.7000, note: "Stable plateau across 0.50–0.65." },
  { threshold: 0.65, accuracy: 0.7171, precision: 0.8498, recall: 0.5939, f1: 0.6992, note: "Lens 2 High-Risk Boundary (≥ 0.65 has 85.28% actual late orders)." },
  { threshold: 0.70, accuracy: 0.7076, precision: 0.8555, recall: 0.5677, f1: 0.6825, note: "Precision rises above 85.5%, recall begins dropping." },
  { threshold: 0.75, accuracy: 0.6937, precision: 0.8762, recall: 0.5202, f1: 0.6528, note: "High precision (87.62%), misses nearly half of late shipments." },
  { threshold: 0.80, accuracy: 0.6339, precision: 0.8968, recall: 0.3826, f1: 0.5364, note: "Ultra-conservative: 89.68% precision but only 38.26% recall." }
];

let currentView = 'overview';
let currentStageId = 1;
let explorerPage = 1;
const CELLS_PER_PAGE = 25;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderOverviewPipeline();
  renderStageDetail(1);
  initSimulator();
  renderChartsGallery('all', '');
  renderNotebookExplorer();
});

function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  const themeBtn = document.getElementById('themeToggleBtn');
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'light') {
      html.removeAttribute('data-theme');
      themeBtn.textContent = '☀️ Light Mode';
    } else {
      html.setAttribute('data-theme', 'light');
      themeBtn.textContent = '🌙 Dark Mode';
    }
  });
}

function switchView(viewName) {
  currentView = viewName;
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-view') === viewName);
  });
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `view-${viewName}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openStageDeepDive(stageId) {
  currentStageId = stageId;
  switchView('stages');
  renderStageDetail(stageId);
}

function jumpToCellsInExplorer(stageId, specificCell = null) {
  switchView('explorer');
  const stageSelect = document.getElementById('explorerStageFilter');
  const typeSelect = document.getElementById('explorerTypeFilter');
  const searchInput = document.getElementById('explorerSearchInput');

  if (specificCell !== null) {
    stageSelect.value = 'all';
    typeSelect.value = 'all';
    searchInput.value = `Cell #${specificCell}`;
  } else {
    stageSelect.value = String(stageId);
    typeSelect.value = 'all';
    searchInput.value = '';
  }
  explorerPage = 1;
  renderNotebookExplorer();
}

function renderOverviewPipeline() {
  const grid = document.getElementById('overviewPipelineGrid');
  const nbData = window.NOTEBOOK_DATA || { charts: [], cells: [] };

  grid.innerHTML = STAGES_META.map(st => {
    const chartCount = nbData.charts.filter(c => c.stageId === st.id).length;
    const cellCount = st.endCell - st.startCell + 1;
    return `
      <div class="stage-overview-card" onclick="openStageDeepDive(${st.id})">
        <div>
          <div class="stage-card-top">
            <span class="stage-num-badge">STAGE ${String(st.id).padStart(2, '0')}</span>
            <span class="cell-range-badge">${st.cellRange} (${cellCount} cells)</span>
          </div>
          <h4>${st.title}</h4>
          <p>${st.shortDesc}</p>
        </div>
        <div class="stage-card-footer">
          <span>${st.activities.length} Key Activities • ${chartCount} Charts</span>
          <span style="color: var(--accent-blue); font-weight: 600;">Open Stage →</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderStageDetail(stageId) {
  currentStageId = stageId;
  const sidebar = document.getElementById('stageSidebarNav');
  const nbData = window.NOTEBOOK_DATA || { charts: [], cells: [] };

  sidebar.innerHTML = STAGES_META.map(st => {
    const active = st.id === stageId ? 'active' : '';
    return `
      <button class="stage-nav-item ${active}" onclick="renderStageDetail(${st.id})">
        <div class="s-top">
          <span>STAGE ${String(st.id).padStart(2, '0')}</span>
          <span>${st.cellRange}</span>
        </div>
        <div class="s-title">${st.title}</div>
      </button>
    `;
  }).join('');

  const st = STAGES_META.find(s => s.id === stageId) || STAGES_META[0];
  const stageCharts = nbData.charts.filter(c => c.stageId === st.id);
  const stageCells = nbData.cells.filter(c => c.stageId === st.id);
  const htmlTableCells = stageCells.filter(c => c.hasHtml).length;

  const pane = document.getElementById('stageDetailPane');
  pane.innerHTML = `
    <div class="stage-detail-header">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div class="hero-tags" style="margin-bottom:0;">
          <span class="tag">STAGE ${String(st.id).padStart(2, '0')} OF 12</span>
          <span class="tag emerald">${st.cellRange} (${stageCells.length} Cells)</span>
          <span class="tag purple">${stageCharts.length} Visual Plots</span>
          <span class="tag amber">${htmlTableCells} DataFrame Outputs</span>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          ${st.id > 1 ? `<button class="btn-secondary" style="padding:0.45rem 0.85rem; font-size:0.8rem;" onclick="renderStageDetail(${st.id - 1})">← Stage ${st.id - 1}</button>` : ''}
          ${st.id < 12 ? `<button class="btn-secondary" style="padding:0.45rem 0.85rem; font-size:0.8rem;" onclick="renderStageDetail(${st.id + 1})">Stage ${st.id + 1} →</button>` : ''}
          <button class="btn-primary" style="padding:0.45rem 0.95rem; font-size:0.8rem;" onclick="jumpToCellsInExplorer(${st.id})">View All ${stageCells.length} Code/Output Cells</button>
        </div>
      </div>
      <h2>Stage ${st.id}: ${st.title}</h2>
      <p style="color:var(--text-secondary); font-size:0.95rem;">${st.overview}</p>

      <div class="friendly-callout">
        <div class="friendly-callout-title">💡 Key Takeaway in Plain English</div>
        <p>${st.friendlyTakeaway}</p>
      </div>

      <div class="kpi-grid" style="margin-top:1.1rem; margin-bottom:0;">
        ${st.metrics.map(m => `
          <div class="kpi-card" style="padding:0.9rem 1rem; background:var(--bg-secondary);">
            <div class="kpi-label">${m.label}</div>
            <div class="kpi-value" style="font-size:1.25rem;">${m.value}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <h3 style="font-size:1.15rem; margin-bottom:0.5rem;">What Happens in Stage ${st.id} (Step-by-Step Activities)</h3>
    <div class="activities-grid">
      ${st.activities.map(act => `
        <div class="activity-card">
          <h4>
            <span>${act.name}</span>
            <span class="cell-range-badge">${act.cells}</span>
          </h4>
          <ul>
            ${act.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <h3 style="font-size:1.15rem; margin-bottom:0.4rem;">${st.tableTitle}</h3>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            ${st.tableHeaders.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${st.tableRows.map(row => {
            const isHighlight = row[0].includes('Selected') || row[0].includes('Urgent') || row[0].includes('5-Model') || row[0].includes('High (≥ 0.65)');
            return `<tr class="${isHighlight ? 'highlight-row' : ''}">
              ${row.map(cell => `<td>${cell}</td>`).join('')}
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
      <h3 style="font-size:1.15rem;">Generated Visual Charts in Stage ${st.id} (${stageCharts.length} Plots)</h3>
      <span style="font-size:0.8rem; color:var(--text-secondary);">🔍 Click any chart image to open full-screen zoom</span>
    </div>
    ${stageCharts.length === 0 ? `
      <div style="padding:1.25rem; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:8px; color:var(--text-secondary); font-size:0.88rem;">
        This stage focuses on programmatic cross-validation and tabular hyperparameter optimization (${htmlTableCells} HTML tables & stream logs). Click <strong>"View All ${stageCells.length} Code/Output Cells"</strong> above to inspect every code block and table.
      </div>
    ` : `
      <div class="charts-grid">
        ${stageCharts.map(ch => `
          <div class="chart-card">
            <div class="chart-img-wrap" onclick="openLightbox('${ch.src}', '${escapeHtml(ch.title)}', ${ch.cellIndex}, ${ch.stageId})">
              <img src="${ch.src}" alt="${escapeHtml(ch.title)}" loading="lazy" />
            </div>
            <div class="chart-meta">
              <h5>${escapeHtml(ch.title)}</h5>
              <div class="chart-meta-footer">
                <span>Cell #${ch.cellIndex} • Chart #${ch.id}</span>
                <button class="link-btn" onclick="jumpToCellsInExplorer(${ch.stageId}, ${ch.cellIndex})">View Source Cell →</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function initSimulator() {
  const thrSlider = document.getElementById('simThresholdSlider');
  if (thrSlider) {
    thrSlider.addEventListener('input', updateThresholdSim);
    updateThresholdSim();
  }

  ['simLine1', 'simLine2', 'simLine3', 'simOrderValue'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateOrderPrioritySim);
  });
  updateOrderPrioritySim();
}

function setThresholdPreset(index) {
  const slider = document.getElementById('simThresholdSlider');
  if (slider) {
    slider.value = index;
    updateThresholdSim();
  }
}

function applySimPreset(type) {
  const l1 = document.getElementById('simLine1');
  const l2 = document.getElementById('simLine2');
  const l3 = document.getElementById('simLine3');
  const val = document.getElementById('simOrderValue');

  if (type === 'urgent') {
    l1.value = 0.88; l2.value = 0.79; l3.value = 0.76; val.value = 890;
  } else if (type === 'medium') {
    l1.value = 0.55; l2.value = 0.48; l3.value = 0.44; val.value = 460;
  } else if (type === 'low') {
    l1.value = 0.18; l2.value = 0.22; l3.value = 0.19; val.value = 210;
  }
  updateOrderPrioritySim();
}

function updateThresholdSim() {
  const idx = parseInt(document.getElementById('simThresholdSlider').value, 10);
  const row = THRESHOLD_SWEEP_DATA[idx] || THRESHOLD_SWEEP_DATA[6];

  document.getElementById('simThrValue').textContent = row.threshold.toFixed(2);
  document.getElementById('simAccVal').textContent = (row.accuracy * 100).toFixed(2) + '%';
  document.getElementById('simPrecVal').textContent = (row.precision * 100).toFixed(2) + '%';
  document.getElementById('simRecVal').textContent = (row.recall * 100).toFixed(2) + '%';
  document.getElementById('simF1Val').textContent = (row.f1 * 100).toFixed(2) + '%';
  document.getElementById('simThrNote').textContent = row.note;
}

function updateOrderPrioritySim() {
  const p1 = parseFloat(document.getElementById('simLine1').value);
  const p2 = parseFloat(document.getElementById('simLine2').value);
  const p3 = parseFloat(document.getElementById('simLine3').value);
  const val = parseFloat(document.getElementById('simOrderValue').value) || 0;

  document.getElementById('simLine1Val').textContent = p1.toFixed(2);
  document.getElementById('simLine2Val').textContent = p2.toFixed(2);
  document.getElementById('simLine3Val').textContent = p3.toFixed(2);
  document.getElementById('simOrderValueLabel').textContent = '$' + val.toFixed(2);

  const meanProb = (p1 + p2 + p3) / 3.0;
  const predClass = meanProb >= 0.50 ? 'LATE DELIVERY (Class 1)' : 'ON-TIME DELIVERY (Class 0)';

  let riskBand = 'Low Risk (< 0.30)';
  let riskCode = 'Low';
  let riskColor = 'var(--accent-emerald)';
  if (meanProb >= 0.65) {
    riskBand = 'High Risk (≥ 0.65)';
    riskCode = 'High';
    riskColor = 'var(--accent-rose)';
  } else if (meanProb >= 0.30) {
    riskBand = 'Medium Risk (0.30 – 0.65)';
    riskCode = 'Medium';
    riskColor = 'var(--accent-amber)';
  }

  let impactBand = 'Low Impact (< $314.55)';
  let impactCode = 'Low';
  if (val >= 625.71) {
    impactBand = 'High Impact (≥ $625.71)';
    impactCode = 'High';
  } else if (val >= 314.55) {
    impactBand = 'Medium Impact ($314.55 – $625.71)';
    impactCode = 'Medium';
  }

  let priority = 'Medium Priority';
  let action = 'Enhanced monitoring and review';
  let priColor = 'var(--accent-amber)';

  if (riskCode === 'High' && impactCode === 'High') {
    priority = 'URGENT PRIORITY';
    action = 'Immediate operational escalation (83.83% observed late rate in test set)';
    priColor = 'var(--accent-rose)';
  } else if (riskCode === 'Low' && (impactCode === 'Low' || impactCode === 'Medium')) {
    priority = 'Low Priority';
    action = 'Routine tracking (standard automated workflow)';
    priColor = 'var(--accent-emerald)';
  } else if (riskCode === 'Medium' && impactCode === 'Low') {
    priority = 'Low Priority';
    action = 'Routine tracking (low financial exposure)';
    priColor = 'var(--accent-emerald)';
  }

  document.getElementById('simOrderMeanProb').textContent = meanProb.toFixed(3) + ` (${(meanProb * 100).toFixed(1)}%)`;
  document.getElementById('simOrderPredClass').textContent = predClass;
  const rbEl = document.getElementById('simOrderRiskBand');
  rbEl.textContent = riskBand;
  rbEl.style.color = riskColor;

  document.getElementById('simOrderImpactBand').textContent = impactBand;

  const priEl = document.getElementById('simOrderPriority');
  priEl.textContent = priority;
  priEl.style.color = priColor;
  document.getElementById('simOrderAction').textContent = action;
}

function renderChartsGallery(stageFilter = 'all', query = '') {
  const nbData = window.NOTEBOOK_DATA || { charts: [] };
  const q = query.trim().toLowerCase();

  const filtered = nbData.charts.filter(ch => {
    if (stageFilter !== 'all' && String(ch.stageId) !== String(stageFilter)) return false;
    if (q && !ch.title.toLowerCase().includes(q) && !`cell ${ch.cellIndex}`.includes(q)) return false;
    return true;
  });

  document.getElementById('galleryCountLabel').textContent = `Showing ${filtered.length} of ${nbData.charts.length} embedded notebook charts`;

  const grid = document.getElementById('fullChartsGalleryGrid');
  grid.innerHTML = filtered.map(ch => {
    const st = STAGES_META.find(s => s.id === ch.stageId);
    return `
      <div class="chart-card">
        <div class="chart-img-wrap" onclick="openLightbox('${ch.src}', '${escapeHtml(ch.title)}', ${ch.cellIndex}, ${ch.stageId})">
          <img src="${ch.src}" alt="${escapeHtml(ch.title)}" loading="lazy" />
        </div>
        <div class="chart-meta">
          <div>
            <span class="stage-num-badge" style="font-size:0.68rem; padding:0.12rem 0.5rem;">Stage ${ch.stageId}: ${st ? st.title : ''}</span>
            <h5 style="margin-top:0.4rem;">${escapeHtml(ch.title)}</h5>
          </div>
          <div class="chart-meta-footer">
            <span>Cell #${ch.cellIndex} • Plot #${ch.id}</span>
            <button class="link-btn" onclick="jumpToCellsInExplorer(${ch.stageId}, ${ch.cellIndex})">Inspect Cell →</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterGallery() {
  const st = document.getElementById('galleryStageFilter').value;
  const q = document.getElementById('gallerySearchInput').value;
  renderChartsGallery(st, q);
}

function renderNotebookExplorer() {
  const nbData = window.NOTEBOOK_DATA || { cells: [] };
  const stageFilter = document.getElementById('explorerStageFilter').value;
  const typeFilter = document.getElementById('explorerTypeFilter').value;
  const query = document.getElementById('explorerSearchInput').value.trim().toLowerCase();

  const filtered = nbData.cells.filter(c => {
    if (stageFilter !== 'all' && String(c.stageId) !== String(stageFilter)) return false;
    if (typeFilter === 'code' && c.cellType !== 'code') return false;
    if (typeFilter === 'markdown' && c.cellType !== 'markdown') return false;
    if (typeFilter === 'image' && !c.hasImage) return false;
    if (typeFilter === 'html' && !c.hasHtml) return false;

    if (query) {
      const exactCellMatch = query.match(/^cell\s*#?(\d+)$/i);
      if (exactCellMatch) {
        return c.index === parseInt(exactCellMatch[1], 10);
      }
      const inTitle = (c.title || '').toLowerCase().includes(query);
      const inSource = (c.source || '').toLowerCase().includes(query);
      const inOut = (c.outputs || []).some(o => (o.text || '').toLowerCase().includes(query));
      const inCellNum = `cell #${c.index}` === query || `cell ${c.index}` === query;
      if (!inTitle && !inSource && !inOut && !inCellNum) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / CELLS_PER_PAGE));
  if (explorerPage > totalPages) explorerPage = 1;

  const startIdx = (explorerPage - 1) * CELLS_PER_PAGE;
  const pageCells = filtered.slice(startIdx, startIdx + CELLS_PER_PAGE);

  document.getElementById('explorerStatusLabel').textContent =
    `Showing cells ${filtered.length ? startIdx + 1 : 0}–${Math.min(startIdx + CELLS_PER_PAGE, filtered.length)} of ${filtered.length} matching cells (Total in notebook: ${nbData.cells.length})`;

  const listEl = document.getElementById('explorerCellList');
  listEl.innerHTML = pageCells.map(c => {
    const st = STAGES_META.find(s => s.id === c.stageId);
    const badgeType = c.cellType === 'markdown'
      ? `<span class="tag purple">MARKDOWN</span>`
      : `<span class="tag">CODE ${c.executionCount ? `[In ${c.executionCount}]` : ''}</span>`;

    const outputsHtml = (c.outputs || []).map(o => {
      if (o.type === 'stream' || o.type === 'text') {
        return `<div class="nb-stream-out">${escapeHtml(o.text)}</div>`;
      }
      if (o.type === 'html') {
        return `<div class="nb-html-out">${o.html}</div>`;
      }
      if (o.type === 'image') {
        return `
          <div>
            <div class="nb-img-out" onclick="openLightbox('${o.src}', '${escapeHtml(o.caption || c.title)}', ${c.index}, ${c.stageId})">
              <img src="${o.src}" alt="${escapeHtml(o.caption || c.title)}" loading="lazy" />
            </div>
          </div>
        `;
      }
      return '';
    }).join('');

    return `
      <div class="nb-cell" id="nb-cell-${c.index}">
        <div class="nb-cell-header">
          <div class="nb-cell-title">
            <span class="cell-range-badge">Cell #${c.index}</span>
            ${badgeType}
            <span>${escapeHtml(c.title)}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="stage-num-badge" style="cursor:pointer;" onclick="openStageDeepDive(${c.stageId})">
              Stage ${c.stageId}: ${st ? st.title : ''}
            </span>
          </div>
        </div>
        <div class="nb-cell-body">
          ${c.cellType === 'markdown'
            ? `<div class="nb-markdown-block">${escapeHtml(c.source)}</div>`
            : `<pre class="nb-code-block">${escapeHtml(c.source || '# (Empty cell)')}</pre>`
          }
          ${outputsHtml ? `<div class="nb-outputs">${outputsHtml}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  const pagEl = document.getElementById('explorerPagination');
  pagEl.innerHTML = `
    <button class="btn-secondary" ${explorerPage <= 1 ? 'disabled' : ''} onclick="changeExplorerPage(${explorerPage - 1})">← Previous Page</button>
    <span style="font-size:0.88rem; font-weight:600;">Page ${explorerPage} of ${totalPages}</span>
    <button class="btn-secondary" ${explorerPage >= totalPages ? 'disabled' : ''} onclick="changeExplorerPage(${explorerPage + 1})">Next Page →</button>
  `;
}

function changeExplorerPage(newPage) {
  explorerPage = newPage;
  renderNotebookExplorer();
  document.getElementById('view-explorer').scrollIntoView({ behavior: 'smooth' });
}

function onExplorerFilterChange() {
  explorerPage = 1;
  renderNotebookExplorer();
}

function openLightbox(src, title, cellIndex, stageId) {
  const modal = document.getElementById('chartLightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxTitle').textContent = title;
  const st = STAGES_META.find(s => s.id === stageId);
  document.getElementById('lightboxMeta').textContent = `Cell #${cellIndex} • Stage ${stageId}: ${st ? st.title : ''}`;
  const jumpBtn = document.getElementById('lightboxJumpBtn');
  jumpBtn.onclick = () => {
    closeLightbox();
    jumpToCellsInExplorer(stageId, cellIndex);
  };
  modal.classList.add('open');
}

function closeLightbox() {
  document.getElementById('chartLightbox').classList.remove('open');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
