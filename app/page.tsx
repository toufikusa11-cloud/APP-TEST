'use client';

import React, { useState, useEffect } from 'react';
import { Home, FileText, PlayCircle, BookOpen, X, Clock, CalendarDays, Search, Notebook, Download, Trash2, Edit, CheckSquare, Square, ListTodo, Maximize, Minimize, Moon, Sun, Pause, Play, RotateCcw, Menu, Calculator, Award, Percent, Timer, Settings, Dna, Atom, Brain, Compass, Languages, BookOpenCheck, User, Sparkles, ChevronLeft, ChevronRight, GraduationCap, Lock, KeyRound, ShieldAlert, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import AdminSection from './AdminSection';

// --- MOCK DATA ---

const SUBJECTS = [
  'علوم الطبيعة والحياة',
  'العلوم الفيزيائية',
  'الرياضيات',
  'العلوم الإسلامية',
  'الفلسفة',
  'التاريخ والجغرافيا',
  'اللغة العربية وآدابها',
  'اللغة الفرنسية',
  'اللغة الإنجليزية'
];

const examsData = [
  { id: 1, year: '2025', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1MrzUMAGaQIIPTFvZYAQN-3ERaHuUbuIk/preview' },
  { id: 2, year: '2024', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1qSRTIaMkG10xL7y019H34w81NBw14O2U/preview' },
  { id: 3, year: '2023', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1f8iQi3o4grekhvQwm5CyZWTcG9898kaJ/preview' },
  { id: 4, year: '2022', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1iYz_s_xjUyhPP2JxwgeScKYIEj5AxpG9/preview' },
  { id: 5, year: '2021', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1xM6eHb8MrWulzyFCYH6UTXztQftVQl0I/preview' },
  { id: 6, year: '2020', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/13J4b9Scyr9MGikmhtjwjhIgioFJ6Xpv-/preview' },
  { id: 7, year: '2019', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1yQ2OglfrWUIa4w-7m6UHiolQnTaK_taI/preview' },
  { id: 8, year: '2018', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1NaSZxTWWozhAsgvtQBCeqozpAdyB0Z3T/preview' },
  { id: 9, year: '2017', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1IWvbNp5nGeyPC6hCCrA3EDUwYJ5QAztM/preview' },
  { id: 10, year: '2016', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1V653IPiLGaI86ORn0PluRVdCC9YTm9tj/preview' },
  { id: 11, year: '2015', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/15fINlqoiPfzkp_an6twxPkIl9bawP1gQ/preview' },
  { id: 12, year: '2014', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1iGUzSQmhckplPxpE2TfWraL2xESAKlWl/preview' },
  { id: 13, year: '2013', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1QP6PZ9OGsV7tX6eH6zwMepqQmBIHPQqL/preview' },
  { id: 14, year: '2012', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1a4NC65kMXktGr7u6YSVWQXocI54bAzlF/preview' },
  { id: 15, year: '2011', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1rKo71TTLpfJkb62cxjOx9pwqyD1RHSuK/preview' },
  { id: 16, year: '2010', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1ROTNf5VBXf-01XsyWDilh2HcitMifAJD/preview' },
  { id: 17, year: '2009', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/1f-k9KB_9ENhw_nGUpFHOB0TRopAGcmUg/preview' },
  { id: 18, year: '2008', subject: 'علوم الطبيعة والحياة', pdfUrl: 'https://drive.google.com/file/d/13J8KC4L767Ueek98WWaFKE0UuXOg34yd/preview' },
  { id: 19, year: '2025', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/19WtjtJ0-OHr_ov9JNosF36xK8VFJjOsf/preview' },
  { id: 20, year: '2024', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1PLtBe6InviB11Bz5lqoeWk64cigo-rlT/preview' },
  { id: 21, year: '2023', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1-jeb5zIRgMTp-vlZTdj9agQk4iaMtMGy/preview' },
  { id: 22, year: '2022', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1h19_q-JQkYKbK35B-VpQZPD0JXL--tl6/preview' },
  { id: 23, year: '2021', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/11HN2Oz4htz93Y9iEHsQyYmud3FgzMfzi/preview' },
  { id: 24, year: '2020', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1CA_RE8biHGuXa6Jb878dcJpwE7ndp5ko/preview' },
  { id: 25, year: '2019', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/13wQxry2g0jQNb0dWNLirM6ksRo62AcGo/preview' },
  { id: 26, year: '2018', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1NxMNeq9kJLdvOCpgTAb5l95w5Bck2aXx/preview' },
  { id: 27, year: '2017 (دورة عادية)', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1tmhMoD6gzEhvDCD17_Kfc9Q1pZERTgys/preview' },
  { id: 28, year: '2017 (دورة استثنائية)', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1CIDCRKuZgSJqECzQx_w-m4QhNEvx5dBw/preview' },
  { id: 29, year: '2016 (دورة عادية)', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1ZHfhauizkmhOjrcCau1-zSYYoPxq3c9F/preview' },
  { id: 30, year: '2016 (دورة استثنائية)', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/11nRArGoggioRCQNSyQoJapWj-YsLDYZt/preview' },
  { id: 31, year: '2015', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1-sApavVm3gFQ-VZbbhM-cEJSzQ6XOuXv/preview' },
  { id: 32, year: '2014', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/17itpthicYjRmEepbs5d8R6XXREbDkwKr/preview' },
  { id: 33, year: '2013', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1q1i7dmZMwbp4F6IV55SI-sZzRdaJawSF/preview' },
  { id: 34, year: '2012', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1rfDzLQ4pnGMC5h1L_nrOExudlo0Nm4Kt/preview' },
  { id: 35, year: '2011', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1B3JxTDgx6zfkcCxOeVYj2oBbjsNdITBe/preview' },
  { id: 36, year: '2010', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1EjpgBqbKygOFCAObb9ie47plo_WPJCXc/preview' },
  { id: 37, year: '2009', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/17_S8aXv7juPuDvYYSfaKijbjHXG2YEBj/preview' },
  { id: 38, year: '2008', subject: 'الرياضيات', pdfUrl: 'https://drive.google.com/file/d/1H4hWwcdf5LqihRKxKFUsRGK2vG0C650S/preview' },
  { id: 39, year: '2025', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1o5gi1Kjjt-M-sJQP6rKyoFFRPv-iHTC_/preview' },
  { id: 40, year: '2024', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1D1MR9Yy6weuakZxAr484mkpkHRC_NqmP/preview' },
  { id: 41, year: '2023', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1qx96fhiGZxv2q4C4i67IP35SjCXASfrp/preview' },
  { id: 42, year: '2022', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/16sT4X3Ayidm-86exB1jqXdtzFGt09O06/preview' },
  { id: 43, year: '2021', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1C_sCVfUJ0cJyeXsVlKAzFVTCgVIaU8HW/preview' },
  { id: 44, year: '2020', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1DwUCl0hPMQ6ev5Ktfewdpf6jeJyVufAf/preview' },
  { id: 45, year: '2019', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1YFGwA-Kr4zlfyugSjmoYsr4Vium9ByLq/preview' },
  { id: 46, year: '2018', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1ZSe1cLd-OLvNZVSSrrFvtn3bGontJDwE/preview' },
  { id: 47, year: '2017 (دورة عادية)', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/11xHgsYTGb98Oea3K5i9WQYp9zH8-fpo4/preview' },
  { id: 48, year: '2017 (دورة استثنائية)', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/15ZENlrOeLluSMGZLHty0u_u7EQmH9mIF/preview' },
  { id: 49, year: '2016 (دورة عادية)', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1qzTD3CzZmfvv-24W2Cqaf5MbglFn04vK/preview' },
  { id: 50, year: '2016 (دورة استثنائية)', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1nlMhMJc4sc-njCbIuWtTsoinrbAFSYDK/preview' },
  { id: 51, year: '2015', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1-cxhaCayj8XRf4Hy3i8JxzTvd6nXYH5F/preview' },
  { id: 52, year: '2014', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1tBNnpr6RmKzz9EUDobPxoF6RsPdrxbc2/preview' },
  { id: 53, year: '2013', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1Ms0mX8zOmELXPeu1U_sVdVfWk9YHFHm8/preview' },
  { id: 54, year: '2012', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1DsjGNoNnP3yJTWNV0e4rwGXT3NOtQUqW/preview' },
  { id: 55, year: '2011', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1EIHSqbVLZgua1d4a-48AD-TbdHVD1Uq6/preview' },
  { id: 56, year: '2010', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1gN--_-2_ednt7uSvo1_bt2csY_8UnU4G/preview' },
  { id: 57, year: '2009', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1SCRuFY4trCQh2JCf7_zsFgSubd0Ea-4O/preview' },
  { id: 58, year: '2008', subject: 'العلوم الفيزيائية', pdfUrl: 'https://drive.google.com/file/d/1jruUZPGpMEEu_BWbap3Uouzf07ZHyRg8/preview' },
  { id: 59, year: '2025', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1rMpZmApLP0mxzidqxJ6e8UJxFdeBT1TB/preview' },
  { id: 60, year: '2024', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1962KmPtJjeCg36-ISbbbpfTUZ9qI-cke/preview' },
  { id: 61, year: '2023', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1M0DTNJRfKiGjZyTsYnKYJ3m-oWvZR2A3/preview' },
  { id: 62, year: '2022', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1SUIR73jMQK4zDVgExZo5dIx5SxUj38sW/preview' },
  { id: 63, year: '2021', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1Xk1rVVjRR1YGna7r6GXsOA9MTCnZxGKf/preview' },
  { id: 64, year: '2020', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/17GfTss1IJCsrYjcK-W52jvpwe7Ig5mcg/preview' },
  { id: 65, year: '2019', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1lhUTTDdoyOvN2waO73fVf9cYxl75Oa5g/preview' },
  { id: 66, year: '2018', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1YFYPbo7dcmQsQvNRwighbPgqeELzEZkM/preview' },
  { id: 67, year: '2017 (دورة عادية)', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1r6oXXeJ4XRshp3lBGHXRjSagyG7AwQ94/preview' },
  { id: 68, year: '2017 (دورة استثنائية)', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1NeI4dFEG13_AMkEv1RA0Zy902jcIup-z/preview' },
  { id: 69, year: '2016 (دورة عادية)', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1oUtwdSVDFLp-ijes8fcTIVQQ54oksnxO/preview' },
  { id: 70, year: '2016 (دورة استثنائية)', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1MT6LIcU9vI5lI7CvE8Wkg4t-4H-wHI0m/preview' },
  { id: 71, year: '2015', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1nSZzj3Si_XCmcomNAG5P0XzkVbna244Q/preview' },
  { id: 72, year: '2014', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1teayiQEazswXbKJFePZoPo1bfgBsAuHQ/preview' },
  { id: 73, year: '2013', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/11zZVurp9rcXebJa2_LNDiGpCXEUG7rBm/preview' },
  { id: 74, year: '2012', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1Nqebe2Eeq0rlPhxCOTBiTsBtm4_kwuvM/preview' },
  { id: 75, year: '2011', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1r_AosPObZ5i1Jy5oDTCVqG1a193DDPog/preview' },
  { id: 76, year: '2010', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1h44HWggjSJoblpca2E4bHArAUrIo97ag/preview' },
  { id: 77, year: '2009', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1xBL1OmmdufiLYMzUsNHwWwias3FLV1YD/preview' },
  { id: 78, year: '2008', subject: 'اللغة الإنجليزية', pdfUrl: 'https://drive.google.com/file/d/1S6ewi-PxIN5hhfsKmx5cB2Nn7DyXpEuS/preview' },
  { id: 79, year: '2025', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/17ywwvl64qh1p-Rb0chmx2DF03x59-otC/preview' },
  { id: 80, year: '2024', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1s0ayDhh8d2GTOtZ6U4iuDIM8hSelZJIz/preview' },
  { id: 81, year: '2023', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/19VME6096M1eMdi-ms8a79Cfwks3mCHvo/preview' },
  { id: 82, year: '2022', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/11Ar4V4lIxCMc9NkpKdrUK6BYDjvFBn54/preview' },
  { id: 83, year: '2021', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/12Lz6Tk53U8RnUlDdEIZjSgVkEWMhq6vw/preview' },
  { id: 84, year: '2020', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1mh5j1qGgNA_TRdFyaePkLdKWCYWjDWSf/preview' },
  { id: 85, year: '2019', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1zO9wdJJWRYYKx64peXdHbMhIPcLvh0NG/preview' },
  { id: 86, year: '2018', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1z2-wz14q3c_XXM-xZU3H7uGLjO_ZRXdb/preview' },
  { id: 87, year: '2017 (دورة عادية)', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/13cFxuO_355Z1l-kfb2Q_3bPdJZOyCX7M/preview' },
  { id: 88, year: '2017 (دورة استثنائية)', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/15GB21deCGirfz82Pr2VfPktqY34pqLmZ/preview' },
  { id: 89, year: '2016 (دورة عادية)', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/15Gtj2_LF-qnOqVcVhpaaB8HtYKrVbN7S/preview' },
  { id: 90, year: '2016 (دورة استثنائية)', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1gzWQj9Uoojs8A_RBEux50FcTtXAZc2gI/preview' },
  { id: 91, year: '2015', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1RhRZdt7l6-w2n2y_sQVDMb6sPLc5eJLf/preview' },
  { id: 92, year: '2014', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1Ru_adZn7My-fIOEdZjzUAv68K5a5S-Fl/preview' },
  { id: 93, year: '2013', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1qXGdyDg83CsXWTl_kphecnRUmJF5LI1y/preview' },
  { id: 94, year: '2012', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1Ouj_8MwqwQscaVEY4UDjIs-9YVJZ-roh/preview' },
  { id: 95, year: '2011', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/15kUTu-S8WArhMto2dQTSFDX6-PAbx43S/preview' },
  { id: 96, year: '2010', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1vUuwKw97SxvBf6fObKsLywG0cCxkUVZf/preview' },
  { id: 97, year: '2009', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1G6woIOcqIpVbPLC_1INfuePbeg87eV-p/preview' },
  { id: 98, year: '2008', subject: 'اللغة الفرنسية', pdfUrl: 'https://drive.google.com/file/d/1-QtbUGsTRKG6JhUk28z0TPzlD9vYekc9/preview' },
  { id: 99, year: '2025', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1mdVYtfl2CkURUHfyYqcb-L9bY5GDDi1V/preview' },
  { id: 100, year: '2024', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1ABI0O667slIzB1Zk4IFaPy_n5-bCcJf7/preview' },
  { id: 101, year: '2023', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1shSiln95cI-c4Mjq9TQMvxSpxDFR9ZML/preview' },
  { id: 102, year: '2022', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1VQ7KmXkMpMxpVzeHZL5ik4H0Xa9xLZ-F/preview' },
  { id: 103, year: '2021', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/18X4Oput_jjEexujJ9iZwk2HSHbFqzN3z/preview' },
  { id: 104, year: '2020', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1RD1bsPS86OuHC-lMNUV9Bw2DqMBox2gU/preview' },
  { id: 105, year: '2019', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/10IAzpKNR4SE9mYyDrbM81d3NK0C2yBpp/preview' },
  { id: 106, year: '2018', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1tMkkGaxN9uNj5H5uIXsjBwC7oX1yE50q/preview' },
  { id: 107, year: '2017 (دورة عادية)', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1PO1bOFdrMc9sNs3j7CLKL-0kNcroqwMS/preview' },
  { id: 108, year: '2017 (دورة استثنائية)', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1okiutHY0krrdVod_Ch1pHim12FqXRBFm/preview' },
  { id: 109, year: '2016', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/12bmdIgQV5B8P_NZOAn7vml8O1CpblgTi/preview' },
  { id: 110, year: '2015', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1rn8X7rWqgaSHzVrXKpaQfpyfVKZRTM4I/preview' },
  { id: 111, year: '2014', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1393XqeY13DrQDIA-wBlzp8Fb3fNeYfpe/preview' },
  { id: 112, year: '2013', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1XoCQJPB_ottQvM6LkCHrNym-XF7sgGsw/preview' },
  { id: 113, year: '2012', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1TxJR3F9q_2TaELPwtHlCA5z6l297RDlN/preview' },
  { id: 114, year: '2011', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1NEflnP_yM_ByCVXshWpRuGCclIPEhM7k/preview' },
  { id: 115, year: '2010', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/17blCH3upMXfIa9ysvUwjuXDiY3JUMc61/preview' },
  { id: 116, year: '2009', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1MFOIq8UzmpHmlVrjnHi1b2m7jEisk9ma/preview' },
  { id: 117, year: '2008', subject: 'العلوم الإسلامية', pdfUrl: 'https://drive.google.com/file/d/1NpC8rQnD3j0AHlxWNZhOBYcUR8pVEPDV/preview' },
  { id: 118, year: '2025', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1v4V6z0LRCJc6pAW-CLCP2uXwE_MgOPzw/preview' },
  { id: 119, year: '2024', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/127eQgZqzKA9LsZx2HfsAgb1RJVKsXbXI/preview' },
  { id: 120, year: '2023', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1v8Rbn-_zvxfEKvPlwlPJlY1S2Uz03vNX/preview' },
  { id: 121, year: '2022', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1baQdOrvnlRgw940ZGmHvxh5xudgQGwFd/preview' },
  { id: 122, year: '2021', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1O3S1lOK1ETVDhn24-F9TEtLNB3f9nmsa/preview' },
  { id: 123, year: '2020', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1_hgclQV760aVoItncIsvedmyXdJ5vdgd/preview' },
  { id: 124, year: '2019', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1aQRXrRJtuLrOtSQ3QIxNPzEBGkxtNp-a/preview' },
  { id: 125, year: '2018', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1XfP8JsfklCSC1yDkX025xAsPZslkRzRJ/preview' },
  { id: 126, year: '2017 (دورة عادية)', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1UohzFHZlEhrvMsryrFyeLZDkls2oBdHk/preview' },
  { id: 127, year: '2017 (دورة استثنائية)', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/18pe-ADqm5donm-3KGVU4iQXLAUykh3YG/preview' },
  { id: 128, year: '2016 (دورة عادية)', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1Ay7HSoP9oVrTJ7ppZMOBCucKCZEmJpsM/preview' },
  { id: 129, year: '2016 (دورة استثنائية)', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1QyicKtUhsb_rEDATPJbhk3I34ixz5aId/preview' },
  { id: 130, year: '2015', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1uAA7uTcIS8aCrDtssChHgq2NoRvnxCmS/preview' },
  { id: 131, year: '2014', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1KBQ0Fc1Hq-eendK2QXZvZQ7GokOOYG_R/preview' },
  { id: 132, year: '2013', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1nxt9SzeCiBszsOjoOjkh1AOaAkhRlSmO/preview' },
  { id: 133, year: '2012', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1uy7sklfVAI7ODYj0pypvaFwQUWotp26a/preview' },
  { id: 134, year: '2011', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1ZudX_RfxvcOeKJOz2T7zSs2BgtIU_4fV/preview' },
  { id: 135, year: '2010', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1hsQoo6sapAJUYtQ1YgM1i8X5-X3Jpyxd/preview' },
  { id: 136, year: '2009', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/1hsNgUE0wjCUkbfNMfwqkFPjsiBEFmXvN/preview' },
  { id: 137, year: '2008', subject: 'التاريخ والجغرافيا', pdfUrl: 'https://drive.google.com/file/d/184zjnUfjr9Qxf_cr_XTzAXwDxskBZidF/preview' },
  { id: 138, year: '2025', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1Yy0D7c_ocNgZTVRQDw0FDkiw5QPb0lc6/preview' },
  { id: 139, year: '2024', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1ci0DbBZt4uG3YymWcyMfRHAyLOGEVpg3/preview' },
  { id: 140, year: '2023', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1wO5p3Bx3aNM-3Z6BFOODFqvkpVK-y7UX/preview' },
  { id: 141, year: '2022', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1cge6nXorWwgNjOLuZQCycZDEav1D1zHL/preview' },
  { id: 142, year: '2021', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1YO2QyaFogr9oqqwtCWyjt9hhzEbPRUe0/preview' },
  { id: 143, year: '2020', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/16Aan6A4CYQzjdvlI6BVAf9r0YYSe-wCa/preview' },
  { id: 144, year: '2019', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1Q6htnmUHymF5Yh1FcriDlIRdZSFywqtI/preview' },
  { id: 145, year: '2018', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1dUVh0OGZFsHzfP53Cvi3JpCIHvBsfUO6/preview' },
  { id: 146, year: '2017 (دورة عادية)', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1P7a_GT3qROLbz_eQovSYDlw1oZEj3rJW/preview' },
  { id: 147, year: '2017 (دورة استثنائية)', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/15fWVt1JY5_kpagsNs94npKn_kPZxN9fj/preview' },
  { id: 148, year: '2016 (دورة عادية)', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/14fpOobRfLnxy0CfLjqZcrhFLqbX9QFb1/preview' },
  { id: 149, year: '2016 (دورة استثنائية)', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1WhboDmfAUyICAPDkHlbwBxy2AHPtA8T3/preview' },
  { id: 150, year: '2015', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1O7S9JPTz6FlYh9xNEw7tdhOJvWIZNZtY/preview' },
  { id: 151, year: '2014', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/13wf0vDh7Q_3xpuUAvSmQzhM78-AgiwFv/preview' },
  { id: 152, year: '2013', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1u1aaJRwUd5Yb_QrV60lAp_PMOaCQ4RHm/preview' },
  { id: 153, year: '2012', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1VBg4AnaWgGmGnrHFPszsfmhJg-b3WJhp/preview' },
  { id: 154, year: '2011', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1VH5PxYKiZM6VCfy0jzrxME6CE-_8lvEh/preview' },
  { id: 155, year: '2010', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1XLsmZU6QLcBTic-G-vFyfNYVwTGB9dNH/preview' },
  { id: 156, year: '2009', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/11z-fimxon08u48yZF5aP8j5Pm1fsmnwK/preview' },
  { id: 157, year: '2008', subject: 'الفلسفة', pdfUrl: 'https://drive.google.com/file/d/1IKNSVdvorAC_OnEeHauuZiXj9yDWUp29/preview' },
  { id: 158, year: '2025', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1eip5DbeFmlpJXqVDjreoFvkxGB7UWnUx/preview' },
  { id: 159, year: '2024', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/15RwN38H47_Gh91-2PRoqoBBOPEqqjlsG/preview' },
  { id: 160, year: '2023', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1kfX9xBd-YlrWLIewgIlXQT-X6GAvPGVk/preview' },
  { id: 161, year: '2022', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1-bvdcKZxWWhPChs2PzGjjrwiEH0rxhd3/preview' },
  { id: 162, year: '2021', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1Ct1LXI0FrSHISeRMwUVaJRdiVyft5rKH/preview' },
  { id: 163, year: '2020', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1sb8r2GMqN42fuTDvr2JXVHnBYemq_c-S/preview' },
  { id: 164, year: '2019', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/16dJsAh64w_UgYi8KYH4mzymbRqyiCBVk/preview' },
  { id: 165, year: '2018', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1XnyNax14rPDGRjz1ZM8rELA0CBbTCL7B/preview' },
  { id: 166, year: '2017 (دورة عادية)', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1sEgqdF9TLCJKnJ-f7Yi2dC5an0hGSeyu/preview' },
  { id: 167, year: '2017 (دورة استثنائية)', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/17kBnrlQ8lWtWBGm3aEXyv0oHo4wAbg87/preview' },
  { id: 168, year: '2016', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1J7jQR9cH8F5Zj6Jv9T-mLtIYFp8h_Hvj/preview' },
  { id: 169, year: '2015', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1tcLrFCULjazXSvPPASuQuJ87BdmxFPHp/preview' },
  { id: 170, year: '2014', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1J_13fRW44KMT6_pRNs0Ak9j0JYLuqzsR/preview' },
  { id: 171, year: '2013', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1CtPBihxsSoBeaQxSSs2-S1DJimN4iXCL/preview' },
  { id: 172, year: '2012', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1ntEbsz548rvibHNAC3bp3mnvH9WxPLeP/preview' },
  { id: 173, year: '2011', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1NqPJ6iNH0aq6P-iQH6u6eEjHzH-ldsx8/preview' },
  { id: 174, year: '2010', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1-bBKP93qV_j9IeY6R2fZp_Wx1oj7TdK-/preview' },
  { id: 175, year: '2009', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1r5ZeuM0B7VQ594lNrkPEhsr7UEAr60D9/preview' },
  { id: 176, year: '2008', subject: 'اللغة العربية وآدابها', pdfUrl: 'https://drive.google.com/file/d/1SL1OP159Hjw3JdVtq6tq4aPwB2PGHgCk/preview' }
];

const getYoutubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const rawScienceData = [
  { unitNum: 1, title: "آليات تركيب البروتين", url: "https://www.youtube.com/watch?v=A8Lm-GeIbMQ", videoTitle: "✅ الوحدة 01| أفضل شرح من الألف إلى الياء لوحدة تركيب البروتين  🧬" },
  { unitNum: 2, title: "العلاقة بين بنية ووظيفة البروتين", url: "https://www.youtube.com/watch?v=bkxJteKmID4", videoTitle: "✅ الوحدة 02| أفضل شرح من الألف إلى الياء لوحدة العلاقة بين بنية و وظيفة البروتين  🧬" },
  { unitNum: 3, title: "النشاط الإنزيمي للبروتينات", url: "https://www.youtube.com/watch?v=agS-u8GWOgQ", videoTitle: "✅ الوحدة 03| أفضل شرح من الألف إلى الياء لوحدة الأنزيمات  🧬" },
  { unitNum: 4, title: "دور البروتينات في الدفاع عن الذات (المناعة)", url: "https://www.youtube.com/watch?v=mQ54MHis_qg", videoTitle: "✅ الوحدة 04| أفضل شرح من الألف إلى الياء لوحدة المناعة  🧬 «\u00A0 🦠🧬🩸💊💉1080P HD" },
  { unitNum: 5, title: "دور البروتينات في الاتصال العصبي", url: "https://www.youtube.com/watch?v=m0q5NgC_Xas", videoTitle: "الوحدة 05| أفضل شرح لوحدة الإتصال العصبي من الألف إلى الياء  🧠✨" },
  { unitNum: 6, title: "التكتونية العامة (الجيولوجيا)", url: "https://www.youtube.com/watch?v=KjrVgP8N5Ws", videoTitle: "الوحدة 06| أفضل شرح من الألف إلى الياء لوحدة التركيب الضوئي  🌱🌞" },
  { unitNum: 7, title: "البنية الجيولوجية ومصدر الطاقة الداخلية للكرة الأرضية", url: "https://www.youtube.com/watch?v=IVQQIInZ3XE", videoTitle: "الوحدة 07| أفضل شرح من الألف إلى الياء لوحدة التنفس  🫁💨" }
];

const scienceUnits = rawScienceData.map((item) => {
  const videoId = getYoutubeId(item.url);
  const formattedUnitNum = String(item.unitNum).padStart(2, '0');
  return {
    id: `SCI_U${item.unitNum}`,
    subject: "علوم الطبيعة والحياة",
    title: `الوحدة ${formattedUnitNum}: ${item.title}`,
    videos: [
      {
        id: `SCI_U${item.unitNum}_V1`,
        title: item.videoTitle,
        videoId: videoId
      }
    ]
  };
});

const rawIslamicUrls = [
  "https://www.youtube.com/watch?v=SBxCLDHOj4Y",
  "https://www.youtube.com/watch?v=mFi5lHJwtF0",
  "https://www.youtube.com/watch?v=LckJvHpIT1E",
  "https://www.youtube.com/watch?v=PzHHZnvulFM",
  "https://www.youtube.com/watch?v=47GwIqlKLnA",
  "https://www.youtube.com/watch?v=l_TgizsPZ5s",
  "https://www.youtube.com/watch?v=3uc8-ZSDjMI",
  "https://www.youtube.com/watch?v=30mW12QfKiE",
  "https://www.youtube.com/watch?v=dUz4cEBwPEQ",
  "https://www.youtube.com/watch?v=Ra5kbvske2s",
  "https://www.youtube.com/watch?v=ZVBmxiqLkg4",
  "https://www.youtube.com/watch?v=SDMvppi4SnA",
  "https://www.youtube.com/watch?v=as_O6NqTXFQ",
  "https://www.youtube.com/watch?v=Ox4St2jDT7w",
  "https://www.youtube.com/watch?v=77K1g8F3PTY",
  "https://www.youtube.com/watch?v=O3Iq6nkClfg",
  "https://www.youtube.com/watch?v=5j0jJvoLZww",
  "https://www.youtube.com/watch?v=WYuU-xHG6yM",
  "https://www.youtube.com/watch?v=rS0x22vn4TY",
  "https://www.youtube.com/watch?v=5sx1ake43wo",
  "https://www.youtube.com/watch?v=qdC-fSUZqvY",
  "https://www.youtube.com/watch?v=kmgkiz2iZho",
  "https://www.youtube.com/watch?v=01cEK4gxZ28",
  "https://www.youtube.com/watch?v=6U76b7PKN0I",
  "https://www.youtube.com/watch?v=w9rpAOpOAZ4",
  "https://www.youtube.com/watch?v=LCRWX-JP00M"
];

const islamicRealTitles = [
  "العقيدة الإسلامية وأثرها على الفرد والمجتمع",
  "وسائل القرآن في تثبيت العقيدة الإسلامية",
  "الإسلام والرسالات السماوية",
  "العقل في القرآن الكريم",
  "مقاصد الشريعة الإسلامية",
  "منهج الإسلام في محاربة الانحراف والجريمة",
  "المساواة أمام أحكام الشريعة الإسلامية في العقوبات",
  "الصحة النفسية والجسدية في القرآن الكريم",
  "من مصادر التشريع الإسلامي: الإجماع، المصلحة المرسلة",
  "القيم في القرآن الكريم",
  "الوقف في الإسلام",
  "من أحكام الأسرة في الإسلام: مدخل إلى علم الميراث",
  "الربا وأحكامه",
  "من المعاملات المالية الجائزة: بيع الصرف، بيع المرابحة، بيع التقسيط",
  "الحرية الشخصية ومدى ارتباطها بحرية الآخرين",
  "من أحكام الأسرة في الإسلام: النسب، الكفالة",
  "العلاقات الاجتماعية بين المسلمين وغيرهم",
  "خطبة الرسول ﷺ في حجة الوداع"
];

const islamicUnits = [
  {
    id: "ISL_ALL_LESSONS",
    subject: "العلوم الإسلامية",
    title: "العلوم الإسلامية - جميع الدروس المقررة",
    videos: rawIslamicUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const realTitle = islamicRealTitles[index] || `درس داعم ومراجعة رقم ${index + 1 - 18}`;
      return {
        id: `ISL_V${lessonNum}`,
        title: `الدرس ${lessonNum}: ${realTitle}`,
        videoId: videoId
      };
    })
  }
];

const rawHowariUrls = [
  "https://www.youtube.com/watch?v=WthL6ilnLbU",
  "https://www.youtube.com/watch?v=eEgk21kRJzA",
  "https://www.youtube.com/watch?v=2omxvK_e9CU",
  "https://www.youtube.com/watch?v=LEZcV4mxeic",
  "https://www.youtube.com/watch?v=Pp3nUAk0Eo0",
  "https://www.youtube.com/watch?v=sMH0opKXaPY"
];

const rawDeifUrls = [
  "https://www.youtube.com/watch?v=4q_npbS8F5E",
  "https://www.youtube.com/watch?v=kPi6v9waMkc",
  "https://www.youtube.com/watch?v=t-PfIN6wYC8",
  "https://www.youtube.com/watch?v=maTdy2acASo",
  "https://www.youtube.com/watch?v=fhdhabT1lpw",
  "https://www.youtube.com/watch?v=b8Jy_vb-4V8",
  "https://www.youtube.com/watch?v=UD3n0hWoOWY",
  "https://www.youtube.com/watch?v=pZnRfBZKAd8",
  "https://www.youtube.com/watch?v=JxgLaIQFzEQ",
  "https://www.youtube.com/watch?v=eHTaf3FRu3Y",
  "https://www.youtube.com/watch?v=9FFRVuBIMLU",
  "https://www.youtube.com/watch?v=HQtjFqT3cs0",
  "https://www.youtube.com/watch?v=8Gg1Pud0WHk"
];

const howariTitles = [
  "الحتمية و اللاحتمية - مقال واجد جدلي",
  "البيولوجيا - المنهج التجريبي على الأحياء",
  "علم النفس - العلوم الإنسانية",
  "العنف والتسامح",
  "هل الفلسفة ضرورية أم غير ضرورية",
  "المقارنة بين العلم و الفلسفة - المشكلة و الإشكالية"
];

const deifTitles = [
  "المقارنة بين العلم والفلسفة بالمخططات",
  "مقالة المقارنة بين العلم و الفلسفة",
  "قيمة الفلسفة شرح مبسط جدا",
  "قيمة الفلسفة",
  "أصل المفاهيم الرياضية بالمخططات",
  "مقالة أصل الرياضيات بطريقة المخططات",
  "اليقين الرياضي ( نتائج الرياضيات ) بطريقة المخططات",
  "الحتمية و اللاحتمية",
  "مقالة البيولوجيا",
  "العلوم الإنسانية الجزء 1",
  "العلوم الإنسانية الجزء 2 ( علم التاريخ )",
  "مقالة الشعور بالأنا و الغير",
  "الأخطاء التي تمنعك من نيل نقطة ممتازة في الفلسفة"
];

const philosophyUnits = [
  {
    id: "PHIL_HOWARI_ALL",
    subject: "الفلسفة",
    title: "مادة الفلسفة - الأستاذ هواري (جميع الدروس والمقالات)",
    videos: rawHowariUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const customTitle = howariTitles[index] || "درس فلسفة";
      return {
        id: `PHIL_H_V${lessonNum}`,
        title: `الحصة ${lessonNum}: ${customTitle}`,
        videoId: videoId
      };
    })
  },
  {
    id: "PHIL_DEIF_ALL",
    subject: "الفلسفة",
    title: "مادة الفلسفة - الأستاذة ضيف (جميع الدروس والمخططات)",
    videos: rawDeifUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const customTitle = deifTitles[index] || "درس فلسفة";
      return {
        id: `PHIL_D_V${lessonNum}`,
        title: `الحصة ${lessonNum}: ${customTitle}`,
        videoId: videoId
      };
    })
  }
];

const rawArabicUrls = [
  "https://www.youtube.com/watch?v=iR6W1eHbo6c",
  "https://www.youtube.com/watch?v=Mk_FRUS_djQ",
  "https://www.youtube.com/watch?v=rK8yiLgAp7c",
  "https://www.youtube.com/watch?v=ekfBk5jaDCU",
  "https://www.youtube.com/watch?v=MvrkyyXrJ9I",
  "https://www.youtube.com/watch?v=iPflxOyTLT4",
  "https://www.youtube.com/watch?v=ovC9V23oipg",
  "https://www.youtube.com/watch?v=_zIogMOeDvs",
  "https://www.youtube.com/watch?v=73w1aGCU0y8",
  "https://www.youtube.com/watch?v=vvN1jWgSwRI",
  "https://www.youtube.com/watch?v=IXXn8g8LOVE",
  "https://www.youtube.com/watch?v=wAPXwqmXM7M",
  "https://www.youtube.com/watch?v=vB4rcp9F4ks",
  "https://www.youtube.com/watch?v=-C-5IyEp-Dw",
  "https://www.youtube.com/watch?v=h72fYdMZZxE",
  "https://www.youtube.com/watch?v=Nu45ob_wknw",
  "https://www.youtube.com/watch?v=7COy6oZgE7c",
  "https://www.youtube.com/watch?v=Q30jUHXkdNk",
  "https://www.youtube.com/watch?v=P9jE6RfcaEk",
  "https://www.youtube.com/watch?v=y6_iPJGy7oM",
  "https://www.youtube.com/watch?v=Yu-fNuYbaBc",
  "https://www.youtube.com/watch?v=QRlQytR8ueE",
  "https://www.youtube.com/watch?v=Nsq2zUS0vpw",
  "https://www.youtube.com/watch?v=_L7idFy72sc"
];

const arabicRealTitles = [
  "برنامج الأدب العربي | ماذا ستدرس في السنة 3ثانوي (جميع التخصصات)",
  "الدرس الأول | البناء الفكري | عصر الضعف والانحطاط | 3 ثانوي جميع الشعب (شرح في القمة )",
  "إضافات للدرس الأول ( عصر الضعف والانحطاط) باك 2025",
  "الدرس الثاني | البناء الفكري | المصطحات الأساسية في البناء الفكري (مهم جدا) بكالوريا جميع الشعب",
  "الدرس 01| البناء اللغوي | القرائن اللغوية نقطة مجانية في الباك | جميع الشعب 3ثانوي",
  "الدرس 02 | البناء اللغوي | الحقول الدلالية | جميع شعب البكالوريا",
  "الدرس 03| الشعر التعليمي | بناء فكري | 3ثانوي الشعب العلمية",
  "البناء الفكري 04| النثر العلمي المتأدب | بكالوريا جميع الشعب باك 2025",
  "الدرس 03 | البناء اللغوي | المجاز المرسل بطريقة مميزة | باك 2025 جميع الشعب",
  "المجاز العقلي | البناء اللغوي 04| جميع الشعب | 3 ثانوي بكالوريا",
  "البناء اللغوي 05| الفرق بين المجاز العقلي والمرسل والاستعارة | ثالثة ثانوي جميع الشعب",
  "البناء الفكري الدرس 06| الجزء 01|أدب المهجر (المدرسة الرومنسية) | جميع الشعب | باك2025",
  "البناء الفكري 07| شعر المهجر | الجزء الثاني | جميع الشعب | باك 2025",
  "البناء اللغوي | إعراب إذا و الاسم بعدها | الجزء الأول | 3ثالثة ثانوي باك 2025",
  "البناء اللغوي | 3ثانوي | إعراب إذ و حينئذ | الجزء الثاني | لن أترككم أبطالي 💪💪",
  "أقوى مراجعة في أدب المهجر | جميع الشعب | أفكار متعوب عليها 🥇| باك 2025  #لن أترككم أبطالي💪",
  "الجمل التي لا محل لها من الإعراب | 3ثانوي جميع الشعب | #لن اترككم أبطالي 💪",
  "عوامل نهضة الأدب في العصر الحديث | 3ثانوي",
  "البناء اللغوي | إعراب إذن و إذا (بالتنوين) | جميع طلبة البكالوريا #لن أترككم أبطالي",
  "التلخيص ونثر الأبيات | كما يجب أن يكون + نموذج من باك 2016 | جميع شعب البكالوريا(وليس رؤوس أقلام)",
  "مصطلحات ضرورية لكل طالب بكالوريا (باك 2024)",
  "المراجعة الأسطورية 01| مهجر+منهجية الإجابة+الجمل+الأساليب البلاغية | 3ثانوي جميع الشعب #لن أترككم 💪",
  "المراجعة الشاملة 03ثانوي| ليلة الرعد | منهجية البناء الفكري | التلخيص | الصور البيانية # لن أترككم",
  "كيف تفرق بين الصور البيانية ببساطة"
];

const arabicUnits = [
  {
    id: "ARA_BOUBAKER",
    subject: "اللغة العربية وآدابها",
    title: "اللغة العربية - الأستاذ بوبكر",
    videos: rawArabicUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const realTitle = arabicRealTitles[index] || "";
      const displayTitle = realTitle ? `بوبكر - الدرس ${lessonNum}: ${realTitle}` : `بوبكر - الدرس ${lessonNum}`;
      return {
        id: `ARA_B_V${lessonNum}`,
        title: displayTitle,
        videoId: videoId
      };
    })
  },
  {
    id: "ARA_HAYKOUN",
    subject: "اللغة العربية وآدابها",
    title: "اللغة العربية - الأستاذ حيقون",
    videos: rawArabicUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const realTitle = arabicRealTitles[index] || "";
      const displayTitle = realTitle ? `حيقون - الدرس ${lessonNum}: ${realTitle}` : `حيقون - الدرس ${lessonNum}`;
      return {
        id: `ARA_H_V${lessonNum}`,
        title: displayTitle,
        videoId: videoId
      };
    })
  }
];

const rawFrenchUrls = [
  "https://www.youtube.com/watch?v=gjLVvi0_Nzw",
  "https://www.youtube.com/watch?v=u6jMnfhMUrU",
  "https://www.youtube.com/watch?v=0LtY63ZYIa0",
  "https://www.youtube.com/watch?v=hvEU4La44M4",
  "https://www.youtube.com/watch?v=DbCUqbsdvno",
  "https://www.youtube.com/watch?v=X6sFKBgg3kc",
  "https://www.youtube.com/watch?v=X6EeXAPnu4s",
  "https://www.youtube.com/watch?v=zb2A7JcdBec",
  "https://www.youtube.com/watch?v=wkq0phk1lrw",
  "https://www.youtube.com/watch?v=3IV8xc4cLD8",
  "https://www.youtube.com/watch?v=8q1SDQ4nbYw",
  "https://www.youtube.com/watch?v=k40UqZXrCk8",
  "https://www.youtube.com/watch?v=HWCJp_azPg8",
  "https://www.youtube.com/watch?v=arl_BsuDjyI",
  "https://www.youtube.com/watch?v=gXuIaskummc",
  "https://www.youtube.com/watch?v=BeGzUltfdBw",
  "https://www.youtube.com/watch?v=g5fUiNVIrsw",
  "https://www.youtube.com/watch?v=2PiuczQiF2w",
  "https://www.youtube.com/watch?v=GwoaovphFgk",
  "https://www.youtube.com/watch?v=2WLLMS0PN_4",
  "https://www.youtube.com/watch?v=og-eHpoGo3k",
  "https://www.youtube.com/watch?v=v20TVCddtcs",
  "https://www.youtube.com/watch?v=a55RU0HKtwM",
  "https://www.youtube.com/watch?v=-efOSMSlOtA",
  "https://www.youtube.com/watch?v=iuhm9UmorTk",
  "https://www.youtube.com/watch?v=7I06eIyjto0",
  "https://www.youtube.com/watch?v=1ncfTARoNUc",
  "https://www.youtube.com/watch?v=lYfJnKneJmU",
  "https://www.youtube.com/watch?v=pDGBzC49u3k",
  "https://www.youtube.com/watch?v=w22Heb5p1ak",
  "https://www.youtube.com/watch?v=7v_Jaiq-MXE",
  "https://www.youtube.com/watch?v=mDRuB8ul9CM",
  "https://www.youtube.com/watch?v=MAAo4z0IL4s"
];

const frenchRealTitles = [
  "الدرس الأول /النص التاريخي - le texte historique - ثالثة ثانوي",
  "الدرس الثاني /النص التاريخي - le type de l'auteur  - ثالثة ثانوي",
  "الدرس الثالث /النص التاريخي -la visée communicative  - ثالثة ثانوي",
  "الدرس الرابع /النص التاريخي - le compte rendu objectif et critique - ثالثة ثانوي",
  "الدرس رقم 01 - قواعد - بكالوريا/ la subjectivité",
  "الدرس رقم 02 - قواعد - بكالوريا/ la nominalisation",
  "الدرس رقم 03 - قواعد - بكالوريا| les valeurs du conditionnel présent",
  "الدرس رقم 04 - قواعد - بكالوريا/ les valeurs des deux points",
  "اختبار رقم 01 - فرنسية بكالوريا  - جميع الشعب - composition n : 01",
  "اختبار رقم 02 - فرنسية بكالوريا   - جميع الشعب - composition n : 02",
  "الدرس الأول /النص الحججي  - le texte argumentatif - ثالثة ثانوي",
  "الدرس الثاني /النص الحججي -la visée communicative  - ثالثة ثانوي",
  "النص الحججي- le compte rendu objectif et critique - ثالثة ثانوي",
  "الدرس رقم 05 - قواعد - بكالوريا/ l'opposition et la concession",
  "تعلم بسهولة العلاقة بين السبب والنتيجة مع أمثلة عملية | Bac :la cause et la conséquence",
  "Bac : La voix active et la voix passive  بأسهل طريقة ( جميع الشعب)",
  "الدرس الأول/النص الارشادي/النداء-l'appel/ثالثة ثانوي",
  "La visée communicative de l'appel BAC",
  "Le compte rendu de l'appel BAC",
  "L'expression de but BAC l Le but : 3AS",
  "Bac  : l'impératif l les valeurs de L'impératif",
  "bac : le subjonctif",
  "le discours directe et indirect - bac",
  "المراجعة النهاية للفصل الأول - texte d'Histoire - بكالوريا",
  "المراجعة النهاية للفصل الثاني بكالوريا",
  "المراجعة النهاية للفصل الثالث بكالوريا",
  "حل موضوع بكالوريا 2018 - الموضوع الأول",
  "حل موضوع بكالوريا 2020 débat d'idées  - texte argumentatif",
  "حل نموذج بكالوريا 2020 فرنسية /Bac 2020",
  "le compte rendu bac 2020.",
  "حل موضوع بكالوريا 2021 /bac",
  "حل نموذج بكالوريا 2023 فرنسية /Bac 2023",
  "حلول بكالوريا - الفصل الثاني - bac"
];

const frenchUnits = [
  {
    id: "FRE_ALL_LESSONS",
    subject: "اللغة الفرنسية",
    title: "اللغة الفرنسية - جميع الدروس المقررة",
    videos: rawFrenchUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const realTitle = frenchRealTitles[index] || "";
      const displayTitle = realTitle ? `الدرس ${lessonNum}: ${realTitle}` : `الدرس ${lessonNum}`;
      return {
        id: `FRE_V${lessonNum}`,
        title: displayTitle,
        videoId: videoId
      };
    })
  }
];

const rawEnglishUrls = [
  "https://www.youtube.com/watch?v=rsGMGeFWCBU",
  "https://www.youtube.com/watch?v=znWIczgn5zk",
  "https://www.youtube.com/watch?v=4DD42tyn1EI",
  "https://www.youtube.com/watch?v=J0duXIAlSeY",
  "https://www.youtube.com/watch?v=nobcGpEHVN8",
  "https://www.youtube.com/watch?v=QDlvZAEjDV8",
  "https://www.youtube.com/watch?v=GnKt30zc5m0",
  "https://www.youtube.com/watch?v=2Jg7WTenz6M",
  "https://www.youtube.com/watch?v=5dx-Jp32W_w",
  "https://www.youtube.com/watch?v=3uoqo5wnnV8"
];

const englishRealTitles = [
  "Bac 2026 : English : الشرح الكامل للبكالوريا و أهم الدروس مع الأمثلة ( جميع الشعب )",
  "English 01 : Bac 2026 : أول درس في البكالوريا أفضل شرح مع حل تمارين ( جميع الشعب )",
  "English 01 : Bac 2026 : أهم درس في الانجليرية بالشرح المفصل مع حل تمارين ( جميع الشعب )",
  "Bac 2026 : شرح كامل لدرس جديد مع حل تمارين ( جميع الشعب ) ",
  "Bac 2026 : شرح درسين للقواعد في الإنجليزية مع حل تمارين ( جميع الشعب )",
  "هذا الفيديو سينقذك في البكالوريا : درس رسمي متكرر في امتحان البكالوريا ( جميع الشعب )",
  "Bac 2026 : PRS : الشرح الكامل لدرس بكالوريا  + حل تمارين ( جميع الشعب )",
  "الشرح الكامل للوحدة الأكثر تكرارا في البكالوريا ( لشعبة لغات و شعبة فلسفة )",
  "المراجعة الشاملة للوحدة المرشحة للبكالوريا لجميع الشعب  ",
  "Bac 2026 : الدرس الاكثر تكرارا في البكالوريا ( جميع الشعب ) الشرح الكامل"
];

const englishUnits = [
  {
    id: "ENG_ALL_LESSONS",
    subject: "اللغة الإنجليزية",
    title: "اللغة الإنجليزية - جميع الدروس المقررة",
    videos: rawEnglishUrls.map((url, index) => {
      const videoId = getYoutubeId(url);
      const lessonNum = String(index + 1).padStart(2, '0');
      const realTitle = englishRealTitles[index] || "";
      const displayTitle = realTitle ? `الدرس ${lessonNum}: ${realTitle}` : `الدرس ${lessonNum}`;
      return {
        id: `ENG_V${lessonNum}`,
        title: displayTitle,
        videoId: videoId
      };
    })
  }
];

const physicsUnits = [
  {
    id: "phys_unit1",
    title: "الوحدة 01: المتابعة الزمنية لتحول كيميائي",
    videos: [
      { id: "BL9zSZ5FQSE", title: "المتابعة الزمنية عن طريق المعايرة اللونية" },
      { id: "9GUukVMcpuM", title: "المتابعة الزمنية عن طريق الناقلية" },
      { id: "Pd_wsfrTWoU", title: "الملخص الشامل لطرق المتابعة الزمنية" },
      { id: "fqir-hvQnmU", title: "تدريب حول العلاقات و البيانات BAC 2025" },
      { id: "7_fC3Eax8d4", title: "تدريب حول السرعات و زمن نصف التفاعل 01" },
      { id: "Uc2TEYUX0qs", title: "تدريب حول السرعات و زمن نصف التفاعل 2" },
      { id: "7ycxBfzV5Jc", title: "حل تمرين بكالوريا 2021 تقني رياضي و رياضيات" },
      { id: "V0OdHXglPIQ", title: "تمرين شامل في المتابعة الزمنية عن طريق الناقلية BAC" },
      { id: "qzM2VirF_p0", title: "ماء الجافيل و الدرجة الكلورومترية BAC 2026" },
      { id: "8oJQZBm6I-E", title: "تمرين تطبيقي شامل في المعايرة اللونية BAC 2026" },
      { id: "3NE9jtCVt0c", title: "تمرين شامل في المتابعة الزمنية عن طريق الضغط و الناقلية BAC 2026" },
      { id: "R1jC0ZDHAyY", title: "العوامل الحركية II درجة الحرارة ( تجربة الأستاذ صافي رياض)" },
      { id: "hpUh7yXs2lY", title: "العوامل الحركية II سطح التلامس( تجربة الأستاذ صافي رياض)" },
      { id: "xT1Uvjtt718", title: "ورشة تطبيقية حول العلاقات و السرعات و زمن نصف التفاعل" },
      { id: "9YOzh87PGwo", title: "التحضير لاختبار الفصل الأول 3 ثانوي II تمرين شامل في الناقلية" },
      { id: "joifBGDAOhc", title: "التحضير لاختبار الفصل الأول 3 ثانوي II تمرين شامل في ضغط غاز" },
      { id: "DRbvl0NK00c", title: "التحضير لاختبار الفصل الأول 3 ثانوي II المتابعة الزمنية بمستوى أعلى ⭐⭐⭐" },
      { id: "UnFUpOrxfkQ", title: "التحضير لاختبار الفصل الأول II خاص بالشعب التقنية و الرياضي ⭐⭐⭐" },
      { id: "hDzZQaLEA4c", title: "التحضير لاختبار الفصل الأول II تمرين تطبيقي حول المعايرة اللونية ⏱" }
    ]
  },
  {
    id: "phys_unit2",
    title: "الوحدة 02: تطور جملة ميكانيكية",
    videos: [
      { id: "5U5YnxgNJrg", title: "تطور جملة ميكانيكية II تقديم الوحدة" },
      { id: "uXoxt95D1Dc", title: "تطور جملة ميكانيكية بكالوريا 2024 ( مميزات الحركة: الموضع - السرعة - التسارع)" },
      { id: "SSNL4D6B1-c", title: "تطور جملة ميكانيكية BAC 2024 ( تحليل الأشعة - التحليل البعدي- قوانين نيوتن)" },
      { id: "zTmqnbmT1zg", title: "تطور جملة ميكانيكية بكالوريا 2024 ( خصائص الحركة المستقيمة و الدائرية )" },
      { id: "JUcIoNLCGZE", title: "حركة كوكب أو قمر اصطناعي BAC 2024 ( دراسة تطبيقية مفصلة بالأمثلة)" },
      { id: "VIc0HFgNmcA", title: "تمرين حركة كوكب حول الشمس II بكالوريا 2024" },
      { id: "Cpss4K6AjLI", title: "تمرين حركة قمر اصطناعي حول الأرض II بكالوريا  2024" },
      { id: "TimoD1Ctl1M", title: "قوانين كبلر مع مثال تطبيقي IIبكالوريا 2024" },
      { id: "zV5mnsJB_BA", title: "أفكار الكواكب و البيانات المحتملة BAC 2024" },
      { id: "DkG927jt6hY", title: "الميكانيك للسنة 3 ثانوي II الحصة 04: السقوط الشاقولي لجسم صلب" },
      { id: "JHMx-uL2w3g", title: "السقوط الشاقولي لجسم صلب II كل أفكار الدرس و المنحنيات المتوقعة BAC 2024" },
      { id: "GaHLVrNz-GU", title: "تمرين تطبيقي حول السقوط الشاقولي" },
      { id: "9V3hTOGLOms", title: "تمرين شامل حول السقوط الشاقولي لجسم صلب BAC 2024" },
      { id: "VexpAM-rnJQ", title: "السقوط الحر لجسم صلب BAC 2024" },
      { id: "fR6ML3QnoLA", title: "تمرين شامل السقوط الحر و السقوط الشاقولي II بكالوريا 2024" },
      { id: "h6gpkHE1zXU", title: "دراسة حركة قذيفة II بكالوريا 2024" },
      { id: "R_a5S1TwOJI", title: "دراسة كل حالات القذيفة II بكالوريا 2024" },
      { id: "aRO-c8c4Q7g", title: "حل تمرين بكالوريا 2010 علوم تجريبية II القذيفة" },
      { id: "95m-qTMNxho", title: "تمرين رائع حول القذيفة بكالوريا 2024" },
      { id: "OetTwCQgwBY", title: "حل تمرين بكالوريا 2008 علوم تجريبية II القذيفة" },
      { id: "xuJAPBjsxYo", title: "المنحنيات البيانية الواردة في تمارين القذيفة" },
      { id: "iAFAvKm2T7k", title: "الدراسة الطاقوية لحركة قذيفة" },
      { id: "5uG1PZ0aj-w", title: "الحركة في المستوي المائل و الأفقي BAC 2024 ( الجزء 01)" },
      { id: "O8M4x2IFVQc", title: "تمرين الحركة في المستوي BAC 2024 دراسة مثال تطبيقي (جزء2)" },
      { id: "AWTUvBlHdjs", title: "تطبيق الحصيلة الطاقوية ( تذكير خاص بالسنة الثالثة ثانوي)" },
      { id: "JkD4RzUkVJk", title: "تمرين الحركة في المستوي بكالوريا 2017 علوم تجريبية" },
      { id: "x9rGtfBykX0", title: "تمرين الحركة في المستوي - دراسة بيانية بمحذوفية الزمن" },
      { id: "2bJtqkjkw6M", title: "دراسة الجمل المركبة II بكالوريا 2024" },
      { id: "VvLIdnL9pXc", title: "حل تمرين الجمل المركبة II بكالوريا 2024" },
      { id: "YiQG4BhdWBE", title: "دراسة الحركة في المسار الدائري  Bac 2023" },
      { id: "7sUi-ftqbxY", title: "حدود ميكانيك نيوتن BAC 2023" },
      { id: "zdwal_7JNEY", title: "الأسئلة النظرية في درس الأقمار و الكواكب 3AS" },
      { id: "YDMmpDsa1Vk", title: "السقوط الشاقولي II المعادلة التفاضلية للاحتكاك" },
      { id: "6fqMd8R3FNc", title: "تمرين بفكرة جديدة حول الأقمار II بكالوريا 2025" },
      { id: "7bzUtCF8tJw", title: "دراسة حركة القذيفة II ملخص شامل لكل تفاصيل الدرس في أقل من ساعة" },
      { id: "Ho9oXY-HBqs", title: "تمرين شامل حول السقوط الشاقولي لجسم صلب في الهواء" },
      { id: "kaGiIUK7vg0", title: "تمرين شامل حول حركة الكواكب و الأقمار الاصطناعية" },
      { id: "0PCqD89q7Z0", title: "تمرين رائع بأفكار مختلفة في السقوط الشاقولي BAC" },
      { id: "UMS_qekXClk", title: "حدود ميكانيك نيوتن II بكالوريا 2026" },
      { id: "xUjw4ZVw-14", title: "حل تمرين رائع حول القذيفة ⭐⭐" },
      { id: "sZuNhs-GTsc", title: "تمرين الدراسة البيانية في القذيفة ⭐⭐⭐" },
      { id: "_nOZLxDCehE", title: "تمرين القذيفة ⭐⭐" },
      { id: "ufgg_J04Beo", title: "تمرين القذيفة : بكالوريا ⭐⭐" },
      { id: "gcRB2-gjAn4", title: "دراسة جملة مركبة ⭐⭐" },
      { id: "CxAKpJmjc2M", title: "تمارين في السقوط ⭐⭐" },
      { id: "Yd9WI92iWpU", title: "تمرين الحركة في المستوي ⭐⭐" },
      { id: "OGn7IY_UHag", title: "تمرين تجريبي : المستوي المائل ⭐⭐" },
      { id: "Z6S2GNoPW_Y", title: "تمرين دمج الحركة في المستوي مع قذيفة 🔥🔥" }
    ]
  },
  {
    id: "phys_unit3",
    title: "الوحدة 03: الظواهر الكهربائية",
    videos: [
      { id: "gY3cIRRCsxg", title: "الظواهر الكهربائية II أساسيات الوحدة" },
      { id: "LFrjOAGy2NE", title: "ثنائي القطب RC - شحن و تفريغ مكثفة" },
      { id: "GWR9AoV3-Y8", title: "⛔ توضيح مهم جدا بخصوص تيار الشحن و تيار التفريغ" },
      { id: "jMiRu7ykAz0", title: "ثابت الزمن طو t تعيين حسابيا و بيانيا + التحليل البعدي" },
      { id: "W2XPNwp8Yss", title: "طاقة مكثفة أثناء الشحن و أثناء التفريغ" },
      { id: "H8F_68k8vMw", title: "تمارين الوحدة 03 II التمرين 01: شحن مكثفة" },
      { id: "lovssbImD_M", title: "تمارين الوحدة 03 II التمرين 02: شحن و تفريغ مكثفة + راسم الاهتزاز المهبطي" },
      { id: "gGlO9VhksKE", title: "تمارين الدارة RC - التمرين 03: دارة مكثفة بمقاومتين+ المطابقة البيانية" },
      { id: "TsLSX9nUH5Y", title: "كيفية توصيل راسم الاهتزاز المهبطي و دراسة المنحنيات BAC" },
      { id: "pMj-lzjQDW4", title: "الدارة RC- حل تمرين بكالوريا 2016 علوم تجريبية (الدورة الثانية )" },
      { id: "TxQNNdkPmsQ", title: "تمرين من القسم : مناقشة طاقة مكثفة 🏅" },
      { id: "jr9vyKYZvGM", title: "تمرين تطبيقي الدارة RC ⭐⭐" },
      { id: "hETbEop_VRI", title: "الدارة RC : تمارين كتاب وسام التفوق ⭐⭐" },
      { id: "bVznLp8FOdM", title: "تمرين من القسم : طاقة المكثفة أثناء الشحن ⭐⭐⭐" },
      { id: "QBPgIw5VKXU", title: "الدراسة النظرية للدارة RL : حالة غلق القاطعة" },
      { id: "j-clT5AJ7LQ", title: "الدارة RL:حالة فتح القاطعة" },
      { id: "E0laZtb98ws", title: "تمارين الدارة RL - التمرين 01" },
      { id: "OqGRtqLqo0w", title: "تمارين الدارة RL - حل التمرين 02" },
      { id: "O_mB1VTHYzc", title: "تمارين الدارة RL - حل التمرين 03 ⭐⭐" },
      { id: "PdkHdOWONgk", title: "الدارة RL : التمرين 04 ⭐⭐⭐" },
      { id: "5BM6bJxogHA", title: "تمرين الدارة RL : التمرين 05  ⭐⭐" },
      { id: "xQnuKmdK1C0", title: "تمرين رائع في الدارة RL  حالة فتح القاطعة ⭐⭐⭐" },
      { id: "00_K6VDAD3I", title: "تمرين شامل حول الدارة RL ⭐⭐⭐" },
      { id: "iiSCHb3wTbs", title: "تمرين شامل في الكهرباء - الدارة RC و الدارة RL ⭐⭐⭐" },
      { id: "_3Gz3ikHqyM", title: "تمرين بفكرة رائعة  في الدارة RL ⭐⭐⭐" },
      { id: "XoWZFvEPymY", title: "تمرين بفكرة رائعة  في الدارة RC ⭐⭐⭐" },
      { id: "TV5FgpgRMV0", title: "تمرين دمج  الدارة RC + الدارة RL ⭐⭐⭐" },
      { id: "R4TNKRx7uKk", title: "تمرين شامل بالشرح المفصل الدارة RC ⭐⭐" },
      { id: "q6g0494S6sY", title: "تمرين التميز في  الدارة RL ⭐⭐⭐" },
      { id: "BbOxuFAJgq4", title: "المراجعة النهائية الشاملة للوحدة 03 : كل الأفكار الممكنة 🏅🏅" },
      { id: "jrg2EdaDy5c", title: "أفكار العلامة الكاملة في الكهرباء II المكثفة ⭐⭐⭐" },
      { id: "dpazH1F_ap4", title: "أفكار العلامة الكاملة في الكهرباء II الوشيعة ⭐⭐⭐" },
      { id: "dTONdQFSW0E", title: "تقويم شامل للوحدة 03" },
      { id: "HoJR2susJ_w", title: "تمرين بأفكار مميزة في الدارة RL" },
      { id: "b6-YD7tDP-Q", title: "تمرين شامل في الدارة RL" },
      { id: "oud56tOP72M", title: "تمرين بفكرة في  الدارة RC ⭐​⭐​⭐​" }
    ]
  },
  {
    id: "phys_unit4",
    title: "الوحدة 04: تطور جملة كيميائية نحو التوازن",
    videos: [
      { id: "LMdidxAJ418", title: "الأحماض و الأسس في 150 دقيقة II الوحدة04: تطور جملة كيميائية نحو التوازن" },
      { id: "ZE0KfXeJdYM", title: "الملخص الشامل للوحدة الرابعة II الجزء الاول 🔥🔥" },
      { id: "HUPykXOCRmA", title: "الملخص الشامل للوحدة الرابعة II الجزء الثاني 🔥🔥" },
      { id: "JcWYTHfs-qs", title: "حل تمرين بكالوريا 2009 علوم تجريبية : العلاقة بين طو فينال و Ka ⭐⭐" },
      { id: "mREBGc_z1sw", title: "حل تمرين بكالوريا 2023 تق+ريا  ⭐⭐⭐" },
      { id: "DlfUJUvLNKM", title: "إثبات جميع علاقات الوحدة الرابعة I أكثر من 20 علاقة بالتفصيل 🌟🌟🌟" },
      { id: "C0xDfEYMWxE", title: "تمارين الوحدة 04 I التمرين1 : معايرة حمض ضعيف بأساس قوي ⭐⭐" },
      { id: "dLhFRH8VBxw", title: "تمارين الوحدة 04 I التمرين2 شامل لكل أسئلة المعايرة ⭐⭐⭐" },
      { id: "UJYXc20e1Qg", title: "تمارين شاملة للوحدة الرابعة II أفكار متنوعة وفق منهجية البكالوريا" },
      { id: "XRRsmXN6P5g", title: "حل تمرين بكالوريا 2010 علوم تجريبية : المعايرة pH مترية ⭐⭐⭐" },
      { id: "ibx1uyskJFo", title: "حل تمرين بكالوريا 2008 علوم تجريبية : المعايرة pH مترية ⭐⭐" },
      { id: "-qVqRYkZKyY", title: "تمرين شامل للوحدة الرابعة ⭐⭐⭐⭐" },
      { id: "lHuxHb4uGlc", title: "تمرين شامل للوحدة الرابعة ⭐⭐⭐⭐" },
      { id: "udVmmtBpHVA", title: "حل تمرين بكالوريا 2018 علوم تجريبية الوحدة الرابعة" },
      { id: "kCwGUfye2ME", title: "حل تمرين بكالوريا 2023 علوم تجريبية" }
    ]
  },
  {
    id: "phys_unit5",
    title: "الوحدة 05: التحولات النووية التلقائية والمفتعلة",
    videos: [
      { id: "ZVRgLSBztN4", title: "التحولات النووية التلقائية BAC 2026 : شامل لكل الدرس و أفكار التمارين" },
      { id: "kKM9Z9vLcQM", title: "التحولات النووية II التمرين 17 من معسكر الانقاذ" },
      { id: "OV-u0XIJf4U", title: "التحولات النووية II التمرين 16 من معسكر الانقاذ" },
      { id: "rSWdNaVnWGU", title: "التحولات النووية  المفتعلة II استقرار النواة - منحنى أستون - الانشطار و الاندماج" },
      { id: "krcCLR8io4M", title: "03- التأريخ" },
      { id: "XnXl-mv4J8A", title: "01- التحولات النووية التلقائية" },
      { id: "QuJqh5KktP8", title: "02- التناقص الاشعاعي" },
      { id: "D6Yixo5Xlgk", title: "التحولات النووية / حل تمرين بكالوريا 2008 تقني رياضي" },
      { id: "Jq43Itrq7V8", title: "التحولات النووية : حل تمرين بكالوريا 2008 علوم تجريبية" },
      { id: "xaRuO2em9yA", title: "التحولات النووية / حل تمرين بكالوريا 2010 علوم تجريبية" },
      { id: "VHy20ZjIFz0", title: "التحولات النووية / حل تمرين بكالوريا 2010 تقني رياضي" },
      { id: "X0hHVlM6onc", title: "التحولات النووية / حل تمرين بكالوريا 2024 تقني رياضي" },
      { id: "iyWiMPXWJRg", title: "التحولات النووية / حل تمرين بكالوريا 2024 تقني رياضي" },
      { id: "XUMSILv7HQQ", title: "التحولات النووية / حل تمرين بكالوريا 2013 علوم تجريبية" },
      { id: "1qQ3ifom8tU", title: "التحولات النووية / حل تمرين بكالوريا 2012  علوم تجريبية" },
      { id: "9HMlzw4AODo", title: "التحولات النووية المفتعلة BAC 2026 : شامل لكل الدرس و أفكار التمارين" }
    ]
  },
  {
    id: "phys_unit6",
    title: "الوحدة 06: مراقبة تطور جملة كيميائية | الأسترة",
    videos: [
      { id: "b0vCenHCvT0", title: "الوحدة 06 - الدرس01: تذكير بتسمية بعض المركبات العضوية" },
      { id: "hGdCmeMxVWw", title: "الوحدة 06 - الدرس02: تفاعلات الأسترة و إماهة الأستر" },
      { id: "M9NWqkSTu1k", title: "الوحدة 06 - الدرس03:  الأعمدة و تحصيل الطاقة ( خاص بشعبتي تقني رياضي و رياضيات)" }
    ]
  }
];

const UNITS_DATA: { id: string, subject: string, title: string, videos: { id: string, title: string, videoId: string }[] }[] = [
  {
    id: 'MATH_U1',
    subject: 'الرياضيات',
    title: 'الدوال العددية | الوحدة 01 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U1_V1', title: 'قبل ما تبدأ في النهايات ... لازم تفهم هذه المكتسبات ! 📌 | الدوال العددية 1 | بكالوريا 2026', videoId: 'yM-jjzOx8p4' },
      { id: 'MATH_U1_V2', title: 'فهم العمليات على النهايات وحالات عدم التعيين خطوة بخطوة 🔍 | الدوال العددية 2 | بكالوريا 2026', videoId: 'DAfhrizVSS4' },
      { id: 'MATH_U1_V3', title: 'الدرس لي ضيعوا عليه التلاميذ نقاط كثيرة فالباك! ⛔️ | الدوال العددية 3 | بكالوريا 2026', videoId: '9LgDWaocowc' },
      { id: 'MATH_U1_V4', title: 'كيفاش تحسب نهاية دالة مركبة؟ 🔍 | الدوال العددية 4 | بكالوريا 2026', videoId: 'Uiy2klmAeQw' },
      { id: 'MATH_U1_V5', title: 'الأستاذ اللي فهمني حالات عدم التعيين أخيراً! 🧑\u200D🏫 | الدوال العددية 5 | بكالوريا 2026', videoId: 'GdKaHtDLbt4' },
      { id: 'MATH_U1_V6', title: 'نهاية دالة ناطقة وكثير حدود عند اللانهاية بدون خطأ 🧠 | الدوال العددية 6 | بكالوريا 2026', videoId: '4pMwWA518-g' },
      { id: 'MATH_U1_V7', title: 'حساب النهايات بالمقارنة والحصر (الدراري الصغار يفهموها) 👶 | الدوال العددية 7 | بكالوريا 2026', videoId: 'rJYswHfy8nE' },
      { id: 'MATH_U1_V8', title: 'المستقيمات المقاربة الأفقية والعمودية والمائلة بالتفصيل 📐 | الدوال العددية 8 | بكالوريا 2026', videoId: 'Eyxq7tPGopM' },
      { id: 'MATH_U1_V9', title: 'الاشتقاقية وتفسيرها الهندسي ومعادلة المماس من الصفر 📈 | الدوال العددية 9 | بكالوريا 2026', videoId: 'KAB7jWEVSho' },
      { id: 'MATH_U1_V10', title: 'مشتقة الدوال المركبة والشهيرة بدون حفظ قوانين معقدة 💡 | الدوال العددية 10 | بكالوريا 2026', videoId: '8XfF7a5F5Vc' },
      { id: 'MATH_U1_V11', title: 'اتجاه التغير وجدول التغيرات الكامل للدالة بدون أخطاء إشارة 🛑 | الدوال العددية 11 | بكالوريا 2026', videoId: 'sHYcTtqjImU' },
      { id: 'MATH_U1_V12', title: 'مبرهنة القيم المتوسطة وحصر الحلول بالتفصيل الممل 🎯 | الدوال العددية 12 | بكالوريا 2026', videoId: 'cJUWcLaub_I' },
      { id: 'MATH_U1_V13', title: 'مركز التناظر ومحور التناظر للمنحنى البياني بطرق حاسمة ⚖️ | الدوال العددية 13 | بكالوريا 2026', videoId: 'fOYGiQLLBko' },
      { id: 'MATH_U1_V14', title: 'نقطة الانعطاف وكيفية استخراجها من المشتق الأول والثاني ⚡️ | الدوال العددية 14 | بكالوريا 2026', videoId: 'PUdLjHavAUw' },
      { id: 'MATH_U1_V15', title: 'المناقشة البيانية الأفقية من الألف إلى الياء بالتفصيل 📊 | الدوال العددية 15 | بكالوريا 2026', videoId: 'DPa-L2wndVU' },
      { id: 'MATH_U1_V16', title: 'المناقشة البيانية المائلة والدورانية بدون اختلاط الحالات 🔄 | الدوال العددية 16 | بكالوريا 2026', videoId: '0-wKOImzcHY' },
      { id: 'MATH_U1_V17', title: 'كيفية رسم المنحنى البياني Cf بدقة احترافية خطوة بخطوة ✍️ | الدوال العددية 17 | بكالوريا 2026', videoId: 'ypNKmAFt7E0' },
      { id: 'MATH_U1_V18', title: 'الدوال الصماء والجذرية ودراستها الشاملة لطلبة الباك 🧩 | الدوال العددية 18 | بكالوريا 2026', videoId: '1hVVo3fUpn4' },
      { id: 'MATH_U1_V19', title: 'حل مسألة شاملة ومقترحة بقوة في الدوال العددية (الجزء الأول) 🔥 | الدوال العددية 19 | بكالوريا 2026', videoId: 'lO0BNlUFkVw' },
      { id: 'MATH_U1_V20', title: 'المراجعة النهائية الشاملة في محور الدوال العددية ليلة الامتحان 🏆 | الدوال العددية 20 | بكالوريا 2026', videoId: 'tCJE_UryeVg' },
    ]
  },
  {
    id: 'MATH_U2',
    subject: 'الرياضيات',
    title: 'الدوال الأسية | الوحدة 02 | باكلوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U2_V1', title: '🔑 الدالة أسية + خواصها = مفتاح فهم الوحدة! من النظري إلى التطبيق 💡| الأستاذ عبد الباسط باكلوريا 2026', videoId: '739EpsgTgw4' },
      { id: 'MATH_U2_V2', title: 'دراسة الدالة الأسية بطريقة ذكية | فهم سريع + أمثلة تطبيقية | الأستاذ عبد الباسط', videoId: 'U7k-OczVZRU' },
      { id: 'MATH_U2_V3', title: 'كيف تتعامل مع المعادلات والمتراجحات الأسية باحترافية … افهم ولا تحفظ | الأستاذ عبد الباسط', videoId: 'XXBtwsUUce4' },
      { id: 'MATH_U2_V4', title: '🚨 التزايد المقارن و حساب النهايات في الأسية … فيديو شامل لكل صغيرة وكبيرة ⚠️ | الأستاذ عبد الباسط', videoId: 'BR59BAOLEeM' },
      { id: 'MATH_U2_V5', title: '✏️ لن تخطئ في المشتقات بعد اليوم! | الدوال الأسية مع الأستاذ عبد الباسط 🔥', videoId: 'iP0aZgpr1Wo' },
      { id: 'MATH_U2_V6', title: 'أول تمرين في الدوال الأسية صحّح أخطاءك المنهجية وابنِ الأساس صح!', videoId: 'XkAzLSMzqU8' },
      { id: 'MATH_U2_V7', title: 'من الصفر إلى الإتقان في الدوال الأسية 💪 تمرين شامل مع الشرح المفصل الأستاذ عبد الباسط', videoId: '5HJgan3ldYw' },
      { id: 'MATH_U2_V8', title: 'تمرين دوال أسية لا يُنسى! هل تستطيع حله للنهاية؟ — أفضل تمرين ستمر به على الإطلاق', videoId: 'qnpg-EarCbk' },
      { id: 'MATH_U2_V9', title: '️ تمرين للنخبة في الدوال الأسية 5 نجوم … الغلق النهائي على الوحدة (ت 48 من الكتاب)', videoId: 'rHzyCu1KSZE' }
    ]
  },
  {
    id: 'MATH_U3',
    subject: 'الرياضيات',
    title: 'الدوال اللوغاريتمية | الوحدة 03 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U3_V1', title: 'الدوال اللوغاريتمية: درس شامل ومبسط من الصفر | باكلوريا 2026', videoId: '_n-MY1HL7NY' },
      { id: 'MATH_U3_V2', title: 'خواص الدالة اللوغاريتمية وكيفية توظيفها في حل التمارين | الأستاذ عبد الباسط', videoId: 'AHHNujgWHf8' },
      { id: 'MATH_U3_V3', title: 'لن تصدق أنك ستصير تحسب نهايات الدوال اللوغاريتمية بهذه السهولة 1', videoId: '4uH1jwTUF-U' },
      { id: 'MATH_U3_V4', title: 'نهايات الدوال اللوغاريتمية في المستوى العالي|| خاصة بشعبة رياضيات', videoId: 'wnrIbg_9Prg' },
      { id: 'MATH_U3_V5', title: 'درس حل المعادلات و المتراجحات في الدوال اللوغاريتمية شامل لجميع الحالات ||باك كل الشعب العلمية', videoId: 'Il42LU6PJX4' },
      { id: 'MATH_U3_V6', title: 'درس حساب المشتقات في الدوال اللوغاريتمية شامل مع تمارين من الباكلوريا ||باك كل الشعب العلمية', videoId: 'PZCC-2nk3aA' },
      { id: 'MATH_U3_V7', title: 'أول تمرين في الدوال اللوغاريتمية… بداية قوية لهذا العام! من الصفر إلى الإتقان ‼️', videoId: 'AEBIGfq8QLc' },
      { id: 'MATH_U3_V8', title: 'التمرين الشامل الأول في الدوال اللوغاريتمية مراجعة جد ممتازة اقرا و تمتع', videoId: '_94C9RkESw4' }
    ]
  },
  {
    id: 'MATH_U4',
    subject: 'الرياضيات',
    title: 'المتتاليات العددية | الوحدة 04 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U4_V1', title: 'المتتاليات الدرس 01 || جميع الشعب العلمية + تسيير', videoId: 'OrYf2n8G7D4' },
      { id: 'MATH_U4_V2', title: 'إتجاه تغير متتالية || المتتاليات الدرس 02 || جميع الشعب العلمية + تسيير', videoId: 'slN8FDqOPfQ' },
      { id: 'MATH_U4_V3', title: 'التمثيل البياني لمتتالية و وضع التخمينات || المتتاليات الدرس 03 || باك جميع الشعب العلمية + تسيير', videoId: 'kdHYwIHM5j4' },
      { id: 'MATH_U4_V4', title: 'المتتالية الحسابية مع تمرين من الباكالوريا || المتتاليات الدرس 04 || باك جميع الشعب العلمية + تسيير', videoId: 'BA-hK00Jv_8' },
      { id: 'MATH_U4_V5', title: 'المتتالية الهندسية مع تمرين من الباكالوريا || المتتاليات الدرس 05', videoId: '3GirZ-loY6c' },
      { id: 'MATH_U4_V6', title: 'أقوى شرح لدرس البرهان بالتراجع شامل لجميع الأفكار', videoId: 'XMeRpeqBzLw' },
      { id: 'MATH_U4_V7', title: 'تقارب متتالية عددية ونهايتها || المتتاليات الدرس 07', videoId: 'zrVPJAsU4YA' },
      { id: 'MATH_U4_V8', title: 'المتتاليتان المتجاورتان المتتاليات 08 || باك جميع الشعب العلمية', videoId: 'cHC11xpUD68' },
      { id: 'MATH_U4_V9', title: 'إذا فهمت هذا التمرين فأنت جاهز لوحدة المتتاليات', videoId: 'uqCZn1F4En4' },
      { id: 'MATH_U4_V10', title: 'الفيديو الاستثنائي في وحدة المتتاليات تمرين واحد = 90% من أفكار الوحدة', videoId: 'Q0q6pp7OLHw' },
      { id: 'MATH_U4_V11', title: 'مراجعة نهائية وشاملة في المتتاليات العددية ليلة الامتحان', videoId: '_E-b39e7K1A' }
    ]
  },
  {
    id: 'MATH_U5',
    subject: 'الرياضيات',
    title: 'الدوال الأصلية والحساب التكاملي | الوحدة 05 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U5_V1', title: 'الدوال الأصلية 01: تعريف وخواص مع تمارين تطبيقية', videoId: 'JP8spRTDHOk' },
      { id: 'MATH_U5_V2', title: 'بعد هذا الفيديو ستتمكن من حساب أية دالة أصلية || الدوال الأصلية 2 باكلوريا جميع الشعب العلمية', videoId: 'hw3Gr6e1Fqo' },
      { id: 'MATH_U5_V3', title: 'أقوى شرح لدرس المعادلات التفاضلية || وحدة الدوال الأصلية باكلوريا جميع الشعب العلمية', videoId: 'vnAyB48ooew' },
      { id: 'MATH_U5_V4', title: 'الإبداع في شرح درس التكامل وخواصه || الدوال الأصلية 04 باكلوريا جميع الشعب العلمية', videoId: 'uFIcpI5XLe8' },
      { id: 'MATH_U5_V5', title: 'القيمة المتوسطة وحصرها || الدوال الأصلية 05', videoId: 'qdMc_13zFaE' },
      { id: 'MATH_U5_V6', title: 'الإبداع في شرح درس التكامل بالتجزئة مع جميع أفكاره || باكلوريا جميع الشعب العلمية', videoId: 'UxGi73L2LH8' },
      { id: 'MATH_U5_V7', title: 'استعمال التكامل بالتجزئة لتعيين الدالة الأصلية التي تنعدم عند عدد', videoId: 'J5lpUSAqXP4' },
      { id: 'MATH_U5_V8', title: 'حساب المساحات والحجوم باستخدام التكامل', videoId: 'nPP7FwvswE8' },
      { id: 'MATH_U5_V9', title: 'تطبيقات التكامل في الفيزياء والرياضيات', videoId: 'E8TQknKzBJw' },
      { id: 'MATH_U5_V10', title: 'التمرين الأول حول الدوال الأصلية مأخوذ من الباكلويا || جميع الشعب العلمية', videoId: 'KOc89R_dgNM' },
      { id: 'MATH_U5_V11', title: 'التمرين الثاني حول الدوال الأصلية مأخوذ من الباكلويا', videoId: 'URuilNcXfKw' },
      { id: 'MATH_U5_V12', title: 'تمارين الدوال الأصلية 01 : نماذج باكلوريا علوم تجريبية 1', videoId: 'jUpHPFsmmSM' },
      { id: 'MATH_U5_V13', title: 'تمرين ممتاز في الدوال الأصلية فكرته مقترحة بقوة هذا العام(دمج متتاليات مع تكامل )', videoId: 'XOf2JhhOsJs' },
      { id: 'MATH_U5_V14', title: 'الحصة الأسطورية: كل صغيرة وكبيرة في حصة واحدة! مراجعة شاملة', videoId: 'nKsMsKmU9M4' }
    ]
  },
  {
    id: 'MATH_U6',
    subject: 'الرياضيات',
    title: 'الاحتمالات والإحصاء | الوحدة 06 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U6_V1', title: 'مدخل إلى الاحتمالات: المفاهيم الأساسية والمصطلحات', videoId: 'WOBhLpwMmbQ' },
      { id: 'MATH_U6_V2', title: 'أقوى شرح لدرس قوانين العد مع تمرين من الباكلوريا || الإحتمالات 02', videoId: 'peOhXja5dEk' },
      { id: 'MATH_U6_V3', title: 'الاحتمال الشرطي والحوادث المستقلة شرح مبسط', videoId: 'xX1gbNmuXQY' },
      { id: 'MATH_U6_V4', title: 'شجرة الاحتمالات وكيفية استخدامها في حل التمارين', videoId: '41OrXw4KCls' },
      { id: 'MATH_U6_V5', title: 'هذا أفضل تمرين احتمالات في الباكلوريا ( باك علوم تجريبية 2024 الموضوع الأول ) ✔️', videoId: 'tYT4bSzPmks' },
      { id: 'MATH_U6_V6', title: 'تمرين رائع في الاحتمالات ( باك علوم تجريبية 2024 الموضوع الثاني ) ✔️', videoId: 'le1aO3ylMr4' },
      { id: 'MATH_U6_V7', title: 'المتغير العشوائي وقانون الاحتمال والأمل الرياضي', videoId: 'tVqPdlrufYA' },
      { id: 'MATH_U6_V8', title: 'تمرين شامل حول المتغير العشوائي وقانون الاحتمال', videoId: 'YiEsBdklPTg' },
      { id: 'MATH_U6_V9', title: 'السحب من الصناديق: جميع الحالات (في آن واحد، على التوالي)', videoId: 'h7ql766gPbQ' },
      { id: 'MATH_U6_V10', title: 'حلول تمارين الاحتمالات من بكالوريات سابقة', videoId: '4L161uU4QJk' },
      { id: 'MATH_U6_V11', title: 'مراجعة نهائية وشاملة في الاحتمالات ليلة الامتحان', videoId: 'oKIo59oSTh4' }
    ]
  },
  {
    id: 'MATH_U7',
    subject: 'الرياضيات',
    title: 'الأعداد المركبة والتحويلات النقطية | الوحدة 07 | بكالوريا جميع الشعب العلمية',
    videos: [
      { id: 'MATH_U7_V1', title: 'كل أساسيات وحدة الأعداد المركبة في فيديو واحد', videoId: 'dfC0U0R08s0' },
      { id: 'MATH_U7_V2', title: 'أهم فيديو في وحدة الأعداد المركبة : الطويلة و العمدة و الشكل الأسي و المثلثي || باك2023', videoId: 'R3uzedH67Bw' },
      { id: 'MATH_U7_V3', title: 'المعادلات في مجموعة الأعداد المركبة || الأعداد المركبة 03 || باك2023', videoId: 'pYq9jSDPMeE' },
      { id: 'MATH_U7_V4', title: 'فيديو شامل لكل أنواع التحويلات النقطية المقررة هذا العام || الأعداد المركبة 04', videoId: 'BcK6dSVFSrU' },
      { id: 'MATH_U7_V5', title: 'دستور موافر Moivre بجميع أفكاره || سلسلة أفكار الأعداد المركبة 1', videoId: 'qyExLdBcN3g' },
      { id: 'MATH_U7_V6', title: 'طبيعة المثلثات بجميع حالاتها || سلسلة أفكار الأعداد المركبة 2', videoId: 'DC1n4iBlRcA' },
      { id: 'MATH_U7_V7', title: 'أقوى شرح لمجموعات النقط جميع الحالات (أكثر من 12 حالة ) || سلسلة أفكار الأعداد المركبة', videoId: '1ojRPErZGto' },
      { id: 'MATH_U7_V8', title: 'تمرين شامل في وحدة الأعداد المركبة باكلوريا جميع الشعب العلمية', videoId: 'Gz3S226xzg0' },
      { id: 'MATH_U7_V9', title: 'حل تمرين مقترح بقوة في الأعداد المركبة للبكالوريا', videoId: 'bEP1_xgOsOU' },
      { id: 'MATH_U7_V10', title: 'تمرين شامل في الأعداد المركبة + أفكار مهمة! حضّر للباك بقوة', videoId: 'eeYanofJdCs' }
    ]
  },
  ...physicsUnits.map(unit => ({
    id: unit.id,
    subject: 'العلوم الفيزيائية',
    title: unit.title,
    videos: unit.videos.map(v => ({
      id: v.id,
      title: v.title,
      videoId: v.id
    }))
  })),
  ...scienceUnits,
  ...islamicUnits,
  ...philosophyUnits,
  ...arabicUnits,
  ...frenchUnits,
  ...englishUnits
];

// --- MAIN COMPONENT ---

export default function Platform() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalContent, setModalContent] = useState<{ type: 'pdf' | 'video' | 'drive', url: string, title?: string } | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error(err);
      });
    }
  };

  // --- ACTIVATION SYSTEM STATE ---
  const [isActivated, setIsActivated] = useState(false);
  const [showActivationOverlay, setShowActivationOverlay] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(6);
  const [activationCodeInput, setActivationCodeInput] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState('');
  const [activationSuccess, setActivationSuccess] = useState('');
  const [firstVisitTime, setFirstVisitTime] = useState<number | null>(null);

  // --- ADMIN AUTH STATE ---
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');

  // Read activation status on mount
  useEffect(() => {
    const activeStatus = localStorage.getItem('bacline_activated') === 'true';
    setIsActivated(activeStatus);

    let visitTime = localStorage.getItem('bacline_first_visit');
    if (!visitTime) {
      const now = Date.now();
      localStorage.setItem('bacline_first_visit', now.toString());
      setFirstVisitTime(now);
    } else {
      setFirstVisitTime(parseInt(visitTime, 10));
    }
  }, []);

  // Activation Lock Controller
  useEffect(() => {
    if (isActivated) {
      setShowActivationOverlay(false);
      return;
    }

    // Allow accessing the admin panel for password entry
    if (activeSection === 'admin') {
      setShowActivationOverlay(false);
      return;
    }

    // Home is open completely for free
    if (activeSection === 'home') {
      setShowActivationOverlay(false);
      return;
    }

    // Prerequisites section is open for 3 days
    if (activeSection === 'prerequisites') {
      const visitTimeStr = localStorage.getItem('bacline_first_visit');
      if (visitTimeStr) {
        const visitTime = parseInt(visitTimeStr, 10);
        const elapsed = Date.now() - visitTime;
        const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
        if (elapsed < threeDaysMs) {
          setShowActivationOverlay(false);
          return;
        }
      }
    }

    // Otherwise, immediately lock the entire platform
    setShowActivationOverlay(true);
  }, [activeSection, isActivated, firstVisitTime]);

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setActiveSection('admin');
    } else {
      setShowAdminPasswordModal(true);
      setAdminPasswordError('');
      setAdminPasswordInput('');
    }
  };

  const handleVerifyAdminPassword = () => {
    if (adminPasswordInput === 'BAC-ADMIN-2026') {
      setIsAdminAuthenticated(true);
      setShowAdminPasswordModal(false);
      setActiveSection('admin');
    } else {
      setAdminPasswordError('كلمة المرور غير صحيحة!');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    
    // Remove characters that aren't letters or numbers
    let clean = val.replace(/[^A-Z0-9]/g, '');
    
    // Handle pasting/typing with "BAC" prefix
    if (clean.startsWith('BAC')) {
      clean = clean.substring(3);
    }
    
    clean = clean.substring(0, 9);
    
    let formatted = '';
    if (clean.length > 0) {
      formatted += clean.substring(0, 3);
    }
    if (clean.length > 3) {
      formatted += '-' + clean.substring(3, 6);
    }
    if (clean.length > 6) {
      formatted += '-' + clean.substring(6, 9);
    }
    
    setActivationCodeInput(formatted);
  };

  const handleActivate = async () => {
    let codeToSend = activationCodeInput.trim().toUpperCase();
    
    // Ensure "BAC-" prefix is prepended when sending to API
    if (codeToSend && !codeToSend.startsWith('BAC-')) {
      codeToSend = 'BAC-' + codeToSend;
    }

    if (!codeToSend || codeToSend === 'BAC-' || codeToSend.length < 15) {
      setActivationError('يرجى إدخال رمز تفعيل كامل (مثال: 12A-34B-56C)');
      return;
    }

    setIsActivating(true);
    setActivationError('');
    setActivationSuccess('');

    try {
      const res = await fetch('/api/activation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToSend }),
      });

      const data = await res.json();
      if (data.success) {
        setActivationSuccess('تم تفعيل المنصة بنجاح! شكراً لثقتكم.');
        localStorage.setItem('bacline_activated', 'true');
        localStorage.setItem('bacline_activation_code', codeToSend);
        setIsActivated(true);
        setShowActivationOverlay(false);
      } else {
        setActivationError(data.message || 'رمز التفعيل غير صالح!');
      }
    } catch (err) {
      setActivationError('حدث خطأ أثناء الاتصال بالخادم. الرجاء المحاولة مجدداً.');
    } finally {
      setIsActivating(false);
    }
  };

  // VideosSection Sync States
  const [videosView, setVideosView] = useState<'subjects' | 'teachers' | 'lessons'>('subjects');
  const [videosSelectedSubject, setVideosSelectedSubject] = useState<string | null>(null);
  const [videosSelectedTeacher, setVideosSelectedTeacher] = useState<any | null>(null);
  const [videosSelectedUnitId, setVideosSelectedUnitId] = useState<string | null>(null);
  const [videosSelectedVideoId, setVideosSelectedVideoId] = useState<string | null>(null);

  // Prerequisites Sync States
  const [prereqsView, setPrereqsView] = useState<'subjects' | 'teachers' | 'lessons'>('subjects');
  const [prereqsSelectedSubject, setPrereqsSelectedSubject] = useState<string | null>(null);
  const [prereqsSelectedTeacher, setPrereqsSelectedTeacher] = useState<any | null>(null);
  const [prereqsSelectedUnitId, setPrereqsSelectedUnitId] = useState<string | null>(null);
  const [prereqsSelectedVideoId, setPrereqsSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    // Collapse by default on mobile/tablet screens
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleDarkMode = () => {
    // Platform is dark-theme only, toggle is disabled
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocusMode(false);
      }
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (!modalContent) {
      setIsFocusMode(false);
    }
  }, [modalContent]);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'planner', label: 'بلانر الباك', icon: CalendarDays },
    { id: 'exams', label: 'بنك الامتحانات', icon: FileText },
    { id: 'videos', label: 'فيديوهات وشروحات', icon: PlayCircle },
    { id: 'prerequisites', label: 'المكتسبات القبلية', icon: Brain },
    { id: 'notes', label: 'ملاحظاتي المحفوظة', icon: Notebook },
    { id: 'countdown', label: 'أدوات إضافية', icon: Clock },
    { id: 'success-stories', label: 'تجارب ونصائح الناجحين', icon: Sparkles },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-100 font-cairo" dir="rtl">
      
      {/* HEADER */}
      <header className="fixed top-0 right-0 left-0 h-[70px] bg-slate-900/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-4">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/5 shadow-sm"
            title="قائمة التنقل"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <GraduationCapIcon className="text-white w-5.5 h-5.5" />
          </div>
          <h1 className="text-2xl font-black text-blue-400 tracking-wider hidden sm:block font-mono leading-none">bacline</h1>
        </div>
        
        {/* Fullscreen Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5 shadow-sm transition-all duration-200 cursor-pointer text-sm font-bold hover:text-white group"
            title={isFullscreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>إلغاء ملء الشاشة</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>ملء الشاشة</span>
              </>
            )}
          </button>
        </div>

      </header>

      {/* MOBILE BACKDROP */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed top-[70px] right-0 bottom-0 w-[250px] bg-slate-900 border-l border-white/5 z-30 flex flex-col py-6 transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto ${
          isSidebarCollapsed ? 'translate-x-[250px] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 pointer-events-auto'
        }`}
      >
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.id === 'videos') {
                    setVideosView('subjects');
                    setVideosSelectedSubject(null);
                    setVideosSelectedTeacher(null);
                    setVideosSelectedUnitId(null);
                    setVideosSelectedVideoId(null);
                  }
                  if (item.id === 'prerequisites') {
                    setPrereqsView('subjects');
                    setPrereqsSelectedSubject(null);
                    setPrereqsSelectedTeacher(null);
                    setPrereqsSelectedUnitId(null);
                    setPrereqsSelectedVideoId(null);
                  }
                  if (window.innerWidth < 1024) {
                    setIsSidebarCollapsed(true);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold cursor-pointer border ${
                  isActive 
                    ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-xs' 
                    : 'text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="text-md">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="absolute top-[70px] bottom-0 left-0 bg-slate-950 overflow-y-auto transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] right-0 lg:right-[250px]">
        <div className="p-8 max-w-7xl mx-auto min-h-full">

          <AnimatePresence mode="wait">
            {activeSection === 'home' && <HomeSection key="home" onNavigate={setActiveSection} />}
            {activeSection === 'success-stories' && <SuccessStoriesSection key="success-stories" onOpenModal={setModalContent} />}
            {activeSection === 'admin' && <AdminSection key="admin" />}
            {activeSection === 'countdown' && <CountdownSection key="countdown" />}
            {activeSection === 'planner' && <PlannerSection key="planner" />}
            {activeSection === 'exams' && <ExamsSection key="exams" onOpenModal={setModalContent} />}
            {activeSection === 'videos' && (
              <VideosSection 
                key="videos" 
                onOpenModal={setModalContent}
                currentView={videosView}
                setCurrentView={setVideosView}
                selectedSubject={videosSelectedSubject}
                setSelectedSubject={setVideosSelectedSubject}
                selectedTeacher={videosSelectedTeacher}
                setSelectedTeacher={setVideosSelectedTeacher}
                selectedUnitId={videosSelectedUnitId}
                setSelectedUnitId={setVideosSelectedUnitId}
                selectedVideoId={videosSelectedVideoId}
                setSelectedVideoId={setVideosSelectedVideoId}
              />
            )}
            {activeSection === 'prerequisites' && (
              <VideosSection 
                key="prerequisites" 
                onOpenModal={setModalContent}
                currentView={prereqsView}
                setCurrentView={setPrereqsView}
                selectedSubject={prereqsSelectedSubject}
                setSelectedSubject={setPrereqsSelectedSubject}
                selectedTeacher={prereqsSelectedTeacher}
                setSelectedTeacher={setPrereqsSelectedTeacher}
                selectedUnitId={prereqsSelectedUnitId}
                setSelectedUnitId={setPrereqsSelectedUnitId}
                selectedVideoId={prereqsSelectedVideoId}
                setSelectedVideoId={setPrereqsSelectedVideoId}
                isPrerequisites={true}
              />
            )}
            {activeSection === 'notes' && <SavedNotesSection key="notes" />}
          </AnimatePresence>
        </div>
      </main>

      {/* CINEMATIC MODAL */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm ${isFocusMode ? 'p-0' : 'p-8'}`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full bg-slate-900 overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ${
                isFocusMode 
                  ? 'h-screen max-w-full rounded-none' 
                  : 'max-w-[95vw] xl:max-w-7xl h-full max-h-[90vh] rounded-2xl'
              }`}
            >
              {!isFocusMode && (
                <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900 text-white">
                  <h3 className="font-bold text-lg line-clamp-1">{modalContent.title || 'عرض المحتوى'}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsFocusMode(true)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors font-bold text-sm ml-4 shadow-lg shadow-indigo-600/20"
                    >
                      <Moon className="w-4 h-4" />
                      تفعيل وضع الانعزال التام (Deep Work)
                    </button>
                    <button 
                      onClick={() => setModalContent(null)}
                      className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300 hover:text-white mr-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
              
              {isFocusMode && (
                <button 
                  onClick={() => setIsFocusMode(false)}
                  className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white px-4 py-2 rounded-xl transition-all shadow-lg font-bold text-sm border border-slate-600/50 group"
                >
                  <Minimize className="w-4 h-4 group-hover:scale-90 transition-transform" />
                  إنهاء وضع الانعزال
                </button>
              )}
              
              <div className="flex-1 w-full bg-slate-950 relative flex overflow-hidden">
                <div className={`${modalContent.title && !isFocusMode ? 'flex-[7]' : 'w-full'} relative h-full flex flex-col`}>
                  {isFocusMode && modalContent.type === 'pdf' && (
                     <ExamTimerWidget 
                       isZenMode={true} 
                       onToggleZenMode={() => setIsFocusMode(false)}
                     />
                  )}
                  <div className="flex-1 relative w-full">
                    {modalContent.type === 'pdf' || modalContent.type === 'drive' ? (
                      <iframe 
                        src={modalContent.url} 
                        className="absolute inset-0 w-full h-full border-0 bg-white"
                        title="PDF Viewer"
                      />
                    ) : modalContent.type === 'video' ? (
                      <iframe 
                        src={modalContent.url} 
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video Player"
                      />
                    ) : null}
                  </div>
                </div>
                {modalContent.title && !isFocusMode && (
                  <div className="flex-[3] bg-white dark:bg-slate-800 h-full border-r border-slate-200 dark:border-slate-700 shadow-xl z-10 hidden lg:flex flex-col transition-colors duration-300">
                    {modalContent.type === 'pdf' && (
                      <ExamTimerWidget 
                         isZenMode={false} 
                         onStartChallenge={() => setIsFocusMode(true)}
                         onToggleZenMode={() => setIsFocusMode(true)}
                      />
                    )}
                    <div className="flex-1 overflow-y-auto relative">
                      <SmartNotepad title={modalContent.title} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVATION LOCK OVERLAY */}
      <AnimatePresence>
        {showActivationOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6"
            style={{ direction: 'rtl' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-6 text-center"
            >
              {/* Lock Icon Visual */}
              <div className="mx-auto w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">منصة bacline مغلقة بالكامل</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-semibold">
                  هذه منصة مدفوعة بالكامل. للاستفادة من الميزات (الدروس، المخططات، الامتحانات، وأدوات الدراسة)، يرجى إدخال رمز التفعيل الخاص بك لتأكيد صلاحية الدخول.
                </p>
              </div>

              <div className="space-y-4 text-right">
                <label className="text-xs font-bold text-slate-400 block mr-1">رمز التفعيل الخاص بك</label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="XXX-XXX-XXX"
                    value={activationCodeInput}
                    onChange={handleCodeChange}
                    className="w-full py-3.5 pr-12 pl-4 bg-slate-950 border border-white/5 rounded-xl text-white font-mono text-center text-lg font-black tracking-widest focus:outline-none focus:border-blue-500 uppercase placeholder-slate-700"
                  />
                  <KeyRound className="absolute right-4 top-4 w-5 h-5 text-slate-500" />
                </div>

                {activationError && (
                  <p className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    ⚠️ {activationError}
                  </p>
                )}

                {activationSuccess && (
                  <p className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                    ✓ {activationSuccess}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 cursor-pointer text-sm"
                >
                  {isActivating ? 'جاري التحقق والتفعيل...' : 'تفعيل المنصة والولوج الآن'}
                </button>

                <button
                  onClick={() => {
                    setActiveSection('home');
                    setShowActivationOverlay(false);
                  }}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white font-bold rounded-xl transition-all cursor-pointer text-xs"
                >
                  العودة إلى الصفحة الرئيسية
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN PASSCODE PROMPT MODAL */}
      <AnimatePresence>
        {showAdminPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6"
            style={{ direction: 'rtl' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-slate-900 border border-white/5 rounded-3xl p-7 shadow-2xl space-y-6 text-center"
            >
              <div className="mx-auto w-14 h-14 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                <ShieldAlert className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">التحقق الإداري</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  يرجى إدخال كلمة مرور الإدارة للدخول إلى لوحة تحكم الرموز.
                </p>
              </div>

              <div className="space-y-4 text-right">
                <label className="text-xs font-bold text-slate-400 block mr-1">رمز الآدمن السري</label>
                <input
                  type="password"
                  placeholder="أدخل كلمة المرور..."
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full py-3 px-4 bg-slate-950 border border-white/5 rounded-xl text-white text-center text-sm font-bold tracking-wider focus:outline-none focus:border-purple-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleVerifyAdminPassword();
                    }
                  }}
                />

                {adminPasswordError && (
                  <p className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-center">
                    ⚠️ {adminPasswordError}
                  </p>
                )}
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={handleVerifyAdminPassword}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  تأكيد الدخول
                </button>
                <button
                  onClick={() => setShowAdminPasswordModal(false)}
                  className="flex-1 py-3 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- SUB-SECTIONS ---

function HomeSection({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const marqueeImages1 = [
    "https://i.imgur.com/MM7ifnc.jpg",
    "https://i.imgur.com/oP7NJry.jpg",
    "https://i.imgur.com/ayF5f3b.jpg",
    "https://i.imgur.com/gij41iP.jpg",
    "https://i.imgur.com/5pVGHyB.jpg",
    "https://i.imgur.com/QfaXEUi.jpg",
    "https://i.imgur.com/0sraJRC.jpg",
    "https://i.imgur.com/RReotho.jpg"
  ];

  const marqueeImages2 = [
    "https://i.imgur.com/nMoYa49.jpg",
    "https://i.imgur.com/Au8pqjG.jpg",
    "https://i.imgur.com/s8ZwUDF.jpg",
    "https://i.imgur.com/idlGtvu.jpg",
    "https://i.imgur.com/3tNRlJQ.jpg",
    "https://i.imgur.com/hZHQIo3.jpg",
    "https://i.imgur.com/BUYYW1C.jpg"
  ];

  // We duplicate them to achieve seamless infinite loops
  const column1Images = [...marqueeImages1, ...marqueeImages1];
  const column2Images = [...marqueeImages2, ...marqueeImages2];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: scrollUp 22s linear infinite;
        }
        .animate-marquee-down {
          animation: scrollDown 26s linear infinite;
        }
        .animate-marquee-up:hover, .animate-marquee-down:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Hero Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* Right Column (Content) */}
        <div className="flex flex-col justify-center min-h-[620px]">
          {/* Elite MasterClass Headline */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-10 lg:p-14 border border-slate-800/80 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 my-auto">
              <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-bold mb-4 block">التميز والاحترافية</span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
                تعلم من أفضل الأساتذة، <br/>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">لتكون الأفضل.</span>
              </h2>
              <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                منصة bacline للتحضير لبكالوريا الجزائر. دروس حصرية، ملخصات مركزة، وامتحانات رسمية مشروحة لتوجيهك خطوة بخطوة نحو القمة وتحقيق طموحك.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate?.('videos')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 cursor-pointer text-base lg:text-lg"
                >
                  ابدأ المشاهدة الآن
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column (The Vertical Film Marquee) */}
        <div 
          className="relative h-[620px] rounded-3xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl flex gap-4 p-4"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* Subtle overlay shading for dark movie/theatre aspect */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
          
          {/* Column 1 - Scrolling UP */}
          <div className="flex-1 overflow-hidden h-full relative">
            <div className="flex flex-col gap-4 animate-marquee-up py-4">
              {column1Images.map((src, i) => (
                <div key={`col1-${i}`} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group shadow-lg">
                  <img 
                    src={src} 
                    alt={`Teacher portrait ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-40"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Scrolling DOWN */}
          <div className="flex-1 overflow-hidden h-full relative">
            <div className="flex flex-col gap-4 animate-marquee-down py-4">
              {column2Images.map((src, i) => (
                <div key={`col2-${i}`} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group shadow-lg">
                  <img 
                    src={src} 
                    alt={`Teacher portrait ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-40"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Smart Study Tools - Combined Todo List and Pomodoro Focus Timer */}
      <div className="pt-4">
        <HomeExtraTools />
      </div>
    </motion.div>
  );
}

const bacStreams = {
  "science": { name: "علوم تجريبية", baseCoeff: 29, subjects: [ {name:"علوم طبيعية", coeff:6}, {name:"رياضيات", coeff:5}, {name:"فيزياء", coeff:5}, {name:"لغة عربية", coeff:3}, {name:"لغة فرنسية", coeff:2}, {name:"لغة إنجليزية", coeff:2}, {name:"تاريخ وجغرافيا", coeff:2}, {name:"تربية إسلامية", coeff:2}, {name:"فلسفة", coeff:2} ], optionals: [ {name:"رياضة (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:1} ] },
  "math": { name: "رياضيات", baseCoeff: 28, subjects: [ {name:"رياضيات", coeff:7}, {name:"فيزياء", coeff:6}, {name:"لغة عربية", coeff:3}, {name:"علوم طبيعية", coeff:2}, {name:"لغة فرنسية", coeff:2}, {name:"لغة إنجليزية", coeff:2}, {name:"تاريخ وجغرافيا", coeff:2}, {name:"تربية إسلامية", coeff:2}, {name:"فلسفة", coeff:2} ], optionals: [ {name:"رياضة (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:1} ] },
  "tech_math": { name: "تقني رياضي", baseCoeff: 32, subjects: [ {name:"تكنولوجيا", coeff:7}, {name:"رياضيات", coeff:6}, {name:"فيزياء", coeff:6}, {name:"لغة عربية", coeff:3}, {name:"لغة فرنسية", coeff:2}, {name:"لغة إنجليزية", coeff:2}, {name:"تاريخ وجغرافيا", coeff:2}, {name:"تربية إسلامية", coeff:2}, {name:"فلسفة", coeff:2} ], optionals: [ {name:"رياضة (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:2} ] },
  "management": { name: "تسيير واقتصاد", baseCoeff: 33, subjects: [ {name:"تسيير محاسبي ومالي", coeff:6}, {name:"رياضيات", coeff:5}, {name:"إقتصاد ومناجمنت", coeff:5}, {name:"تاريخ وجغرافيا", coeff:4}, {name:"لغة عربية", coeff:3}, {name:"لغة فرنسية", coeff:2}, {name:"لغة إنجليزية", coeff:2}, {name:"تربية إسلامية", coeff:2}, {name:"قانون", coeff:2}, {name:"فلسفة", coeff:2} ], optionals: [ {name:"رياضة (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:1} ] },
  "languages": { name: "لغات أجنبية", baseCoeff: 27, subjects: [ {name:"لغة عربية", coeff:5}, {name:"لغة فرنسية", coeff:5}, {name:"لغة إنجليزية", coeff:5}, {name:"لغة أجنبية ثالثة", coeff:4}, {name:"تاريخ وجغرافيا", coeff:2}, {name:"فلسفة", coeff:2}, {name:"علوم إسلامية", coeff:2}, {name:"رياضيات", coeff:2} ], optionals: [ {name:"تربية بدنية (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:2} ] },
  "literature": { name: "آداب وفلسفة", baseCoeff: 26, subjects: [ {name:"لغة عربية", coeff:6}, {name:"فلسفة", coeff:6}, {name:"تاريخ وجغرافيا", coeff:4}, {name:"لغة فرنسية", coeff:3}, {name:"لغة إنجليزية", coeff:3}, {name:"تربية إسلامية", coeff:2}, {name:"رياضيات", coeff:2} ], optionals: [ {name:"رياضة (اختياري)", coeff:1}, {name:"لغة أمازيغية (اختياري)", coeff:1} ] }
};

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedStream, setSelectedStream] = useState<keyof typeof bacStreams>('science');
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [optionalMarks, setOptionalMarks] = useState<Record<string, string>>({});
  const [enabledOptionals, setEnabledOptionals] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<Array<{ id: number, streamName: string, average: number, grade: string, date: string }>>([]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('bac_calc_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // --- ADDITIONAL TOOLS STATES & LOGIC ---
  const [activeTool, setActiveTool] = useState<'calculator' | 'pomodoro' | 'todo'>('calculator');

  // Pomodoro Timer States
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [totalCompletedCycles, setTotalCompletedCycles] = useState(0);
  const [pomodoroMessage, setPomodoroMessage] = useState<string | null>(null);

  // Todo List States
  const [countdownTodos, setCountdownTodos] = useState<Array<{ id: string, text: string, completed: boolean }>>([]);
  const [newTodoText, setNewTodoText] = useState('');

  // Load Todo list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('countdown_todos');
    if (saved) {
      try {
        setCountdownTodos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Pomodoro countdown timer logic
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    
    if (pomodoroActive) {
      timerInterval = setInterval(() => {
        if (pomodoroSeconds > 0) {
          setPomodoroSeconds(prev => prev - 1);
        } else if (pomodoroMinutes > 0) {
          setPomodoroMinutes(prev => prev - 1);
          setPomodoroSeconds(59);
        } else {
          setPomodoroActive(false);
          if (pomodoroMode === 'work') {
            setPomodoroMessage('أحسنتم! انتهت حصة العمل (25 دقيقة). حان وقت الاستراحة الآن 🎉');
            setPomodoroMode('break');
            setPomodoroMinutes(5);
            setPomodoroSeconds(0);
            setTotalCompletedCycles(prev => prev + 1);
          } else {
            setPomodoroMessage('انتهت الاستراحة! حان وقت العودة للتركيز والعمل 💪');
            setPomodoroMode('work');
            setPomodoroMinutes(25);
            setPomodoroSeconds(0);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [pomodoroActive, pomodoroMinutes, pomodoroSeconds, pomodoroMode]);

  const handlePomodoroReset = () => {
    setPomodoroActive(false);
    setPomodoroMode('work');
    setPomodoroMinutes(25);
    setPomodoroSeconds(0);
    setPomodoroMessage(null);
  };

  const handlePomodoroModeChange = (newMode: 'work' | 'break') => {
    setPomodoroActive(false);
    setPomodoroMode(newMode);
    setPomodoroMinutes(newMode === 'work' ? 25 : 5);
    setPomodoroSeconds(0);
    setPomodoroMessage(null);
  };

  const saveCountdownTodos = (updatedTodos: Array<{ id: string, text: string, completed: boolean }>) => {
    setCountdownTodos(updatedTodos);
    localStorage.setItem('countdown_todos', JSON.stringify(updatedTodos));
  };

  const addCountdownTodo = () => {
    if (!newTodoText.trim()) return;
    const updated = [...countdownTodos, { id: Date.now().toString(), text: newTodoText.trim(), completed: false }];
    saveCountdownTodos(updated);
    setNewTodoText('');
  };

  const toggleCountdownTodo = (id: string) => {
    const updated = countdownTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveCountdownTodos(updated);
  };

  const deleteCountdownTodo = (id: string) => {
    const updated = countdownTodos.filter(todo => todo.id !== id);
    saveCountdownTodos(updated);
  };

  useEffect(() => {
    // Target date: June 7, 2027 (Approximate standard date for BAC)
    const targetDate = new Date('2027-06-07T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update mark handler
  const handleMarkChange = (subjectName: string, val: string) => {
    let numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      if (numVal < 0) val = '0';
      if (numVal > 20) val = '20';
    }
    setMarks(prev => ({ ...prev, [subjectName]: val }));
  };

  const handleOptionalMarkChange = (optName: string, val: string) => {
    let numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      if (numVal < 0) val = '0';
      if (numVal > 20) val = '20';
    }
    setOptionalMarks(prev => ({ ...prev, [optName]: val }));
  };

  const toggleOptional = (optName: string) => {
    setEnabledOptionals(prev => ({ ...prev, [optName]: !prev[optName] }));
  };

  const currentStreamData = bacStreams[selectedStream];

  // Calculate weighted sum of standard subjects
  let totalWeightedPoints = 0;
  let totalCoefficients = 0;

  currentStreamData.subjects.forEach(sub => {
    const markStr = marks[sub.name];
    const markVal = markStr === '' || markStr === undefined ? 10 : parseFloat(markStr);
    const validMark = isNaN(markVal) ? 10 : markVal;
    totalWeightedPoints += validMark * sub.coeff;
    totalCoefficients += sub.coeff;
  });

  // Calculate bonus points from optional subjects
  let totalBonusPoints = 0;
  currentStreamData.optionals.forEach(opt => {
    if (enabledOptionals[opt.name]) {
      const markStr = optionalMarks[opt.name];
      const markVal = markStr === '' || markStr === undefined ? 10 : parseFloat(markStr);
      const validMark = isNaN(markVal) ? 10 : markVal;
      // Algerian rule: only points above 10 multiplied by coeff are added
      if (validMark > 10) {
        totalBonusPoints += (validMark - 10) * opt.coeff;
      }
    }
  });

  const finalSum = totalWeightedPoints + totalBonusPoints;
  const average = totalCoefficients > 0 ? parseFloat((finalSum / totalCoefficients).toFixed(2)) : 0;

  // Grade helper
  const getGradeInfo = (avg: number) => {
    if (avg >= 18) return { label: 'ممتاز جداً (النخبة)', color: 'text-amber-500 border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]' };
    if (avg >= 16) return { label: 'ممتاز', color: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5 dark:bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]' };
    if (avg >= 14) return { label: 'جيد جداً', color: 'text-purple-500 border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]' };
    if (avg >= 12) return { label: 'جيد', color: 'text-blue-500 border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]' };
    if (avg >= 10) return { label: 'قريب من الحسن', color: 'text-teal-500 border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/10' };
    return { label: 'راسب (تحتاج لمزيد من الاجتهاد)', color: 'text-rose-500 border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10' };
  };

  const gradeInfo = getGradeInfo(average);

  const saveToHistory = () => {
    const newRecord = {
      id: Date.now(),
      streamName: currentStreamData.name,
      average,
      grade: gradeInfo.label,
      date: new Date().toLocaleDateString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newRecord, ...history].slice(0, 5); // Keep last 5 calculations
    setHistory(updated);
    localStorage.setItem('bac_calc_history', JSON.stringify(updated));
  };

  const deleteHistoryItem = (id: number) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('bac_calc_history', JSON.stringify(updated));
  };

  const fillAllWithTen = () => {
    const defaultMarks: Record<string, string> = {};
    currentStreamData.subjects.forEach(sub => {
      defaultMarks[sub.name] = '10';
    });
    setMarks(defaultMarks);
  };

  const fillAllWithFifteen = () => {
    const defaultMarks: Record<string, string> = {};
    currentStreamData.subjects.forEach(sub => {
      defaultMarks[sub.name] = '15';
    });
    setMarks(defaultMarks);
  };

  const clearAllMarks = () => {
    setMarks({});
    setOptionalMarks({});
    setEnabledOptionals({});
  };

  const timeUnits = [
    { label: 'أيام', value: timeLeft.days },
    { label: 'ساعات', value: timeLeft.hours },
    { label: 'دقائق', value: timeLeft.minutes },
    { label: 'ثواني', value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex flex-col items-center justify-start py-8 px-4 relative overflow-hidden space-y-16"
    >
      {/* Background Cinematic ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none animate-pulse delay-2000"></div>

      {/* COUNTDOWN TIMER COMPONENT */}
      <div className="relative z-10 text-center max-w-4xl w-full">
        <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold font-mono tracking-wider mb-6 border border-blue-100 dark:border-blue-900/60 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
          </span>
          بكالوريا 2027
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-6 tracking-tight">
          الوقت يمضي.. <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">وحلمك يقترب</span>
        </h2>
        
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
          كل ثانية تقضيها في الجد والاجتهاد اليوم هي لبنة تبني بها قمة تفوقك غداً. استغل وقتك واجعل حلمك حقيقة!
        </p>

        {/* Massive Glowing Glassmorphism blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto mb-8" dir="ltr">
          {timeUnits.map((unit, index) => (
            <motion.div 
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group bg-slate-900/60 backdrop-blur-xl border-t-2 border-t-blue-400 border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center shadow-2xl hover:border-blue-500/25 hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
              
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tighter mb-2 drop-shadow-[0_2px_10px_rgba(59,130,246,0.15)]">
                {unit.value.toString().padStart(2, '0')}
              </span>
              
              <span className="text-sm lg:text-base font-extrabold text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-4 animate-pulse"></div>

      {/* TOOLS TABS SELECTOR */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-center mb-8">
        <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 flex gap-2 w-full max-w-2xl" dir="rtl">
          <button
            onClick={() => setActiveTool('calculator')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTool === 'calculator'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>حاسبة المعدل</span>
          </button>
          
          <button
            onClick={() => setActiveTool('pomodoro')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTool === 'pomodoro'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>مؤقت التركيز</span>
          </button>
          
          <button
            onClick={() => setActiveTool('todo')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTool === 'todo'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>قائمة المهام</span>
          </button>
        </div>
      </div>

      {activeTool === 'calculator' && (
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <style>{`
            /* Hide spinners for Chrome, Safari, Edge, Opera */
            .no-spinners::-webkit-outer-spin-button,
            .no-spinners::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /* Hide spinners for Firefox */
            .no-spinners {
              -moz-appearance: textfield;
            }
            /* Custom sleek scrollbar for horizontal tabs */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Cinematic Banner Header */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs animate-in fade-in-50 duration-500 mb-10">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
            <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
              <div className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                <Calculator className="w-8 h-8" />
              </div>
              <div className="text-right">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  حاسبة معدل البكالوريا الذكية
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
                  احسب معدلك المتوقع بدقة وسهولة متناهية وفقاً للمناهج والمعاملات الرسمية لوزارة التربية الوطنية الجزائرية.
                </p>
              </div>
            </div>
            <div className="z-10 flex gap-2 shrink-0">
              <span className="px-3.5 py-1.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-full text-xs font-black text-slate-700 dark:text-slate-300 shadow-xs">
                الحساب الرسمي والآني
              </span>
            </div>
          </div>

          {/* Dynamic Bento Style Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Right Area (8 Columns) - Interactive Subjects Input */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Stream Selector Cards */}
              <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs text-right">
                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-4 font-mono tracking-wider uppercase">اختر الشعبة الدراسية:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" dir="rtl">
                  {Object.entries(bacStreams).map(([key, stream]) => {
                    const isActive = selectedStream === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedStream(key as keyof typeof bacStreams);
                          clearAllMarks();
                        }}
                        className={`px-3 py-3 rounded-2xl font-black transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer text-xs ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102 border border-blue-500/20'
                            : 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-[13px]">{stream.name}</span>
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                          معامل {stream.baseCoeff}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sleek Subject Input Rows */}
              <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100 dark:border-white/5 text-right">
                  <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-500" />
                    <span>نقاط المواد الدراسية العامة:</span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={fillAllWithTen}
                      className="text-[11px] font-black px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors cursor-pointer border border-blue-100 dark:border-blue-900/40"
                    >
                      تجربة معدل 10
                    </button>
                    <button 
                      onClick={fillAllWithFifteen}
                      className="text-[11px] font-black px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer border border-emerald-100 dark:border-emerald-900/40"
                    >
                      تجربة معدل 15
                    </button>
                    <button 
                      onClick={clearAllMarks}
                      className="text-[11px] font-black px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer border border-rose-100 dark:border-rose-900/40"
                    >
                      تفريغ النقاط
                    </button>
                  </div>
                </div>

                <div className="space-y-2" dir="rtl">
                  {currentStreamData.subjects.map((sub, idx) => {
                    const rawVal = marks[sub.name] || '';
                    const parsedNum = parseFloat(rawVal);
                    const isFail = !isNaN(parsedNum) && parsedNum < 10;
                    const isPass = !isNaN(parsedNum) && parsedNum >= 10;
                    
                    return (
                      <div 
                        key={idx} 
                        className="group py-3 px-4 flex items-center justify-between gap-4 border border-slate-100 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 rounded-2xl transition-all duration-300 hover:bg-slate-50/60 dark:hover:bg-slate-900/60 hover:shadow-xs"
                      >
                        {/* RIGHT SIDE: Name & Badge */}
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-6 rounded-full transition-all duration-300 ${
                            isFail 
                              ? 'bg-rose-500' 
                              : isPass 
                                ? 'bg-emerald-500' 
                                : 'bg-slate-300 dark:bg-slate-700'
                          }`}></div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{sub.name}</span>
                            <span className="text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/5">
                              معامل {sub.coeff}
                            </span>
                          </div>
                        </div>

                        {/* LEFT SIDE: Inputs */}
                        <div className="w-24 relative">
                          <input
                            type="number"
                            placeholder="10.00"
                            min="0"
                            max="20"
                            step="0.25"
                            value={rawVal}
                            onChange={(e) => handleMarkChange(sub.name, e.target.value)}
                            className="w-full text-center py-2.5 px-3 bg-slate-950/[0.04] dark:bg-slate-950/50 hover:bg-slate-950/[0.08] dark:hover:bg-slate-950/70 focus:bg-white dark:focus:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl font-bold font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all text-xs sm:text-sm text-slate-800 dark:text-white no-spinners"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Subjects Block */}
              {currentStreamData.optionals && currentStreamData.optionals.length > 0 && (
                <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs text-right mt-6">
                  <div className="pb-4 mb-4 border-b border-slate-100 dark:border-white/5">
                    <h5 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">المواد الاختيارية (يُحتسب فقط ما فوق 10 نقاط):</h5>
                  </div>
                  <div className="space-y-2" dir="rtl">
                    {currentStreamData.optionals.map((opt, idx) => {
                      const isEnabled = enabledOptionals[opt.name] || false;
                      const rawVal = optionalMarks[opt.name] || '';
                      
                      return (
                        <div 
                          key={idx}
                          className={`group py-3 px-4 flex items-center justify-between gap-4 border border-slate-100 dark:border-white/5 rounded-2xl transition-all duration-300 ${
                            isEnabled ? 'bg-blue-500/[0.02] border-blue-500/20 dark:border-blue-500/10' : 'bg-slate-50/20 dark:bg-slate-900/10 opacity-70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleOptional(opt.name)}
                              className={`p-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center border ${
                                isEnabled 
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                              }`}
                            >
                              {isEnabled ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{opt.name}</span>
                              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 font-mono">معامل {opt.coeff}</span>
                            </div>
                          </div>
                          {isEnabled && (
                            <div className="w-24">
                              <input
                                type="number"
                                placeholder="10.00"
                                min="0"
                                max="20"
                                step="0.25"
                                value={rawVal}
                                onChange={(e) => handleOptionalMarkChange(opt.name, e.target.value)}
                                className="w-full text-center py-2.5 px-3 bg-slate-950/[0.04] dark:bg-slate-950/50 hover:bg-slate-950/[0.08] dark:hover:bg-slate-950/70 focus:bg-white dark:focus:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl font-bold font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all text-xs sm:text-sm text-slate-800 dark:text-white no-spinners"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Left Column (4 Columns) - Live Scoring Dial & Bento Summary */}
            <div className="lg:col-span-4 space-y-6" dir="rtl">
              
              {/* Live Scoring Display Card */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/5 text-slate-800 dark:text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono mb-4 z-10">المعدل العام المتوقع</span>
                
                {/* Giant Scoring Dial Circle */}
                <div className="relative w-44 h-44 flex items-center justify-center mb-6 z-10">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Circle */}
                    <circle 
                      cx="88" 
                      cy="88" 
                      r="74" 
                      className="stroke-slate-100 dark:stroke-slate-900 fill-transparent" 
                      strokeWidth="8"
                    />
                    {/* Dynamic Progress Stroke */}
                    <circle 
                      cx="88" 
                      cy="88" 
                      r="74" 
                      className="stroke-blue-600 dark:stroke-blue-400 fill-transparent transition-all duration-500" 
                      strokeWidth="8"
                      strokeDasharray={465}
                      strokeDashoffset={465 - (465 * Math.min(20, average)) / 20}
                      strokeLinecap="round"
                      style={{
                        filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.3))'
                      }}
                    />
                  </svg>
                  {/* Score numbers absolute centered */}
                  <div className="absolute flex flex-col items-center" dir="ltr">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-slate-900 dark:text-white">
                      {average.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-wider mt-1">من 20</span>
                  </div>
                </div>

                {/* Dynamic تقدير Tag */}
                <div className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-black leading-relaxed mb-6 transition-all duration-300 z-10 ${gradeInfo.color}`}>
                  التقدير: {gradeInfo.label}
                </div>

                {/* Detailed Point Breakdowns with elegant layout */}
                <div className="w-full space-y-4 border-t border-slate-100 dark:border-white/5 pt-5 text-right font-semibold z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-900 dark:text-white font-black">{totalCoefficients}</span>
                    <span className="text-slate-400 dark:text-slate-500">مجموع المعاملات:</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-900 dark:text-white font-black">{totalWeightedPoints.toFixed(2)}</span>
                    <span className="text-slate-400 dark:text-slate-500">مجموع النقاط الموزونة:</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-500 dark:text-blue-400 font-black">+{totalBonusPoints}</span>
                    <span className="text-slate-400 dark:text-slate-500">نقاط إضافية (المواد الاختيارية):</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-900 dark:text-white font-black">{(totalWeightedPoints + totalBonusPoints).toFixed(2)}</span>
                    <span className="text-slate-400 dark:text-slate-500">المجموع الإجمالي للنقاط:</span>
                  </div>
                </div>

                {/* Action Buttons inside results card */}
                <button
                  onClick={saveToHistory}
                  disabled={average === 0}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 px-4 rounded-2xl font-black text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 z-10"
                >
                  <Award className="w-4 h-4" />
                  حفظ النتيجة في السجل
                </button>
              </div>

              {/* Calculations History list */}
              {history.length > 0 && (
                <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs text-right">
                  <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 font-mono">سجل المحاولات المحفوظة:</h4>
                  <div className="space-y-2.5">
                    {history.map((record) => (
                      <div 
                        key={record.id}
                        className="bg-white/60 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 rounded-2xl p-3 flex items-center justify-between gap-4 transition-all duration-200"
                      >
                        <button 
                          onClick={() => deleteHistoryItem(record.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer border border-transparent hover:border-red-100 dark:hover:border-red-900/40"
                          title="حذف المحاولة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-end gap-2 mb-0.5">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{record.date}</span>
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{record.streamName}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{record.grade}</p>
                        </div>
                        <div className="shrink-0 bg-blue-50 dark:bg-blue-950/80 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/40" dir="ltr">
                          <span className="text-sm font-black font-mono text-blue-600 dark:text-blue-400">{record.average.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tip block */}
              <div className="bg-blue-50/20 dark:bg-slate-900/10 border border-blue-100/20 dark:border-white/5 rounded-3xl p-6 text-right relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
                <h4 className="font-extrabold text-xs sm:text-sm text-blue-900 dark:text-blue-400 mb-2 flex items-center justify-end gap-1.5">
                  <span>نصيحة منهجية</span>
                  <span className="text-sm">💡</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  ركز اهتمامك على المواد ذات المعاملات المرتفعة فهي الرافعة الحقيقية لمعدلك العام، لكن لا تهمل المواد الثانوية فكل نقطة إضافية قد تكون الفارق الحاسم بين حلمك وتخصصك الدراسي المفضل!
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTool === 'pomodoro' && (
        <div className="relative z-10 w-full max-w-4xl mx-auto animate-in fade-in duration-300">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-10 text-center backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20 mb-6">
                <Timer className="w-8 h-8 animate-bounce" />
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2">مؤقت بومودورو للتركيز والإنتاجية</h2>
              <p className="text-slate-400 text-sm max-w-lg mb-8 font-semibold leading-relaxed">
                قسّم وقت المذاكرة إلى فترات مركزة مدتها 25 دقيقة (بومودورو) تليها 5 دقائق استراحة لتجديد نشاطك الذهني.
              </p>

              {/* Mode Selectors */}
              <div className="flex gap-2 mb-10 bg-slate-950/60 p-1.5 rounded-2xl border border-white/5" dir="rtl">
                <button
                  onClick={() => handlePomodoroModeChange('work')}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    pomodoroMode === 'work'
                      ? 'bg-indigo-600 text-white shadow-md border border-indigo-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  فترة التركيز (25 دقيقة)
                </button>
                <button
                  onClick={() => handlePomodoroModeChange('break')}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    pomodoroMode === 'break'
                      ? 'bg-purple-600 text-white shadow-md border border-purple-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  استراحة قصيرة (5 دقائق)
                </button>
              </div>

              {/* Massive Timer Display Circle */}
              <div className="relative w-64 h-64 flex items-center justify-center mb-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    className="stroke-slate-900 fill-transparent"
                    strokeWidth="8"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="112"
                    className={`fill-transparent transition-all duration-500 ${
                      pomodoroMode === 'work' ? 'stroke-indigo-500 animate-pulse' : 'stroke-purple-500 animate-pulse'
                    }`}
                    strokeWidth="8"
                    strokeDasharray={703}
                    strokeDashoffset={
                      703 - (703 * (pomodoroMinutes * 60 + pomodoroSeconds)) / (pomodoroMode === 'work' ? 25 * 60 : 5 * 60)
                    }
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 16px ${pomodoroMode === 'work' ? 'rgba(99,102,241,0.4)' : 'rgba(168,85,247,0.4)'})`
                    }}
                  />
                </svg>
                
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-black font-mono tracking-tighter text-white">
                    {pomodoroMinutes.toString().padStart(2, '0')}:{pomodoroSeconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-black text-slate-400 mt-2 tracking-wide font-mono uppercase">
                    {pomodoroMode === 'work' ? 'وقت التركيز والجد' : 'استمتع بالاستراحة'}
                  </span>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                  className={`px-8 py-4 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-all duration-300 hover:scale-102 ${
                    pomodoroActive
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/10 border border-amber-500/20'
                      : pomodoroMode === 'work'
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 border border-indigo-500/20'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20 border border-purple-500/20'
                  }`}
                >
                  {pomodoroActive ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>إيقاف مؤقت</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>بدء التركيز</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePomodoroReset}
                  className="px-6 py-4 bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة ضبط</span>
                </button>
              </div>

              {/* Completed Cycles & Custom Inline Alerts */}
              <div className="w-full max-w-md">
                {pomodoroMessage && (
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-bold leading-relaxed mb-4 text-center">
                    {pomodoroMessage}
                  </div>
                )}
                
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/40 rounded-xl border border-white/5 text-xs text-slate-400 font-bold font-mono">
                  <span>الدورات المكتملة اليوم:</span>
                  <span className="text-indigo-400 text-sm font-black">{totalCompletedCycles} 🔥</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTool === 'todo' && (
        <div className="relative z-10 w-full max-w-4xl mx-auto animate-in fade-in duration-300">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-10 text-right backdrop-blur-xl shadow-xl">
            <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>

            <div className="flex items-center gap-4 mb-6 flex-row-reverse">
              <div className="p-4 bg-gradient-to-tr from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg shadow-purple-500/20">
                <ListTodo className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">قائمة المهام والمسؤوليات الدراسية</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold leading-relaxed">
                  نظّم أهداف يومك، وحل تمريناتك، ودوّن دروس المذاكرة مع حفظ تلقائي محلي لضمان بقائها.
                </p>
              </div>
            </div>

            {/* Input form */}
            <div className="flex gap-2 mb-8" dir="rtl">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCountdownTodo()}
                placeholder="ما هي المهمة الدراسية التالية؟ (مثال: تلخيص الدرس الأول تاريخ)"
                className="flex-1 bg-slate-950/60 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-semibold placeholder-slate-600 transition-all text-sm"
              />
              <button
                onClick={addCountdownTodo}
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/20 cursor-pointer hover:scale-102"
              >
                إضافة
              </button>
            </div>

            {/* Todo Lists */}
            <div className="space-y-3" dir="rtl">
              {countdownTodos.length === 0 ? (
                <div className="text-center text-slate-500 py-16 border border-dashed border-white/5 rounded-2xl bg-slate-950/10">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="font-bold text-sm">قائمتك فارغة الآن.</p>
                  <p className="text-xs text-slate-600 mt-1">ابدأ بإدخال المهام المدرسية لتتبع تقدمك اليومي بنجاح!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {countdownTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`group p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                        todo.completed
                          ? 'bg-purple-950/10 border-purple-500/10 opacity-75'
                          : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/60 hover:border-purple-500/20'
                      }`}
                    >
                      {/* Checkbox and text clickable */}
                      <div
                        onClick={() => toggleCountdownTodo(todo.id)}
                        className="flex-1 flex items-center gap-3.5 cursor-pointer select-none"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            todo.completed
                              ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                              : 'bg-slate-950 border border-white/10 text-transparent hover:border-purple-500/40'
                          }`}
                        >
                          {todo.completed && <CheckSquare className="w-4 h-4" />}
                        </div>
                        <span
                          className={`text-sm sm:text-base font-bold transition-all duration-300 ${
                            todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>

                      {/* Action delete */}
                      <button
                        onClick={() => deleteCountdownTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-500/20"
                        title="حذف المهمة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Todo Footer summary */}
            {countdownTodos.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
                <div className="flex gap-4">
                  <span>إجمالي المهام: <strong className="text-slate-300">{countdownTodos.length}</strong></span>
                  <span>المكتملة: <strong className="text-purple-400">{countdownTodos.filter(t => t.completed).length}</strong></span>
                </div>
                
                {/* Visual Progress percentage */}
                <div className="w-full sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{
                      width: `${(countdownTodos.filter(t => t.completed).length / countdownTodos.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </motion.div>
  );
}





function ExamsSection({ onOpenModal }: { onOpenModal: (content: {type: 'pdf', url: string, title: string}) => void }) {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [solvedStatus, setSolvedStatus] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('solvedExamsStatus');
    if (saved) {
      try {
        setSolvedStatus(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleToggleSolved = (examId: number) => {
    const newStatus = { ...solvedStatus, [examId]: true };
    setSolvedStatus(newStatus);
    localStorage.setItem('solvedExamsStatus', JSON.stringify(newStatus));
  };

  const filteredExams = examsData.filter(exam => exam.subject === selectedSubject).sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    if (yearA !== yearB) return yearB - yearA;
    return b.year.localeCompare(a.year);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Cinematic Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 animate-in fade-in-50 duration-500">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <FileText className="w-8 h-8" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              بنك الامتحانات الرسمية
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold leading-relaxed">
              تصفح مواضيع البكالوريا السابقة مع التصحيح النموذجي (مدمج في نفس الملف) للتحضير الفعال والتدرب الواقعي.
            </p>
          </div>
        </div>
        <div className="z-10 flex gap-2 shrink-0">
          <span className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs font-black text-slate-300 shadow-xs">
            {examsData.length} موضوع بكالوريا
          </span>
          <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-black shadow-xs">
            {Object.keys(solvedStatus).length} منجزة
          </span>
        </div>
      </div>

      {/* Modern Subject Filters Tab-based instead of chunky select dropdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">اختر المادة التعليمية للتصفح:</h4>
        <div className="flex flex-wrap gap-2.5 justify-start" style={{ direction: 'rtl' }}>
          {SUBJECTS.map((subject) => {
            const isActive = selectedSubject === subject;
            return (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-slate-900/50 hover:bg-slate-900/80 text-slate-300 border border-white/5 hover:text-slate-100'
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Year Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredExams.map((exam) => {
          const isSolved = solvedStatus[exam.id];
          return (
            <motion.div 
              key={exam.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleToggleSolved(exam.id);
                onOpenModal({ type: 'pdf', url: exam.pdfUrl, title: `بكالوريا ${exam.year} - ${exam.subject}` });
              }}
              className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col items-center justify-center gap-3
                ${isSolved 
                  ? 'bg-emerald-500/10 border-emerald-500/25 hover:border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-900/40 border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]'}`}
            >
              <div className={`text-3xl font-black text-center ${isSolved ? 'text-emerald-400' : 'text-slate-200'}`}>
                {exam.year}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                isSolved 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-slate-950 text-slate-400 border border-white/5'
              }`}>
                {isSolved ? 'تم الحل ✓' : 'لم يتم الحل'}
              </div>
            </motion.div>
          );
        })}
        {filteredExams.length === 0 && (
           <div className="col-span-full py-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-white/5">
             لا توجد مواضيع مطابقة لبحثك.
           </div>
        )}
      </div>
    </motion.div>
  );
}

const PREREQUISITE_RAW_DATA: Record<string, string[]> = {
  'علوم الطبيعة والحياة': [
    'https://www.youtube.com/watch?v=EPv7qV4ryX8'
  ],
  'الرياضيات': [
    'https://www.youtube.com/watch?v=aSTwkwrRZwI',
    'https://www.youtube.com/watch?v=MIgvpNMwe4I',
    'https://www.youtube.com/watch?v=b3JVi0RSGrE',
    'https://www.youtube.com/watch?v=OesPoNL01dY',
    'https://www.youtube.com/watch?v=o6fCpCNDR0o',
    'https://www.youtube.com/watch?v=bWszm4oQE0g'
  ],
  'العلوم الفيزيائية': [
    'https://www.youtube.com/watch?v=8lAqxc3btgU',
    'https://www.youtube.com/watch?v=eNaSblF_sSQ',
    'https://www.youtube.com/watch?v=cH2Vl9UBT2k',
    'https://www.youtube.com/watch?v=uifdqXUoFDc',
    'https://www.youtube.com/watch?v=uTHUTvrLsZo',
    'https://www.youtube.com/watch?v=Xp7PwLotvjE',
    'https://www.youtube.com/watch?v=U9y2zSZUNr0',
    'https://www.youtube.com/watch?v=6wSYbbCnNw8',
    'https://www.youtube.com/watch?v=WLm3qKQ83A4',
    'https://www.youtube.com/watch?v=eDMjjvOELXk',
    'https://www.youtube.com/watch?v=XuvBNHMYarM'
  ],
  'اللغة الفرنسية': [
    'https://www.youtube.com/watch?v=2K_dpqs77_Q'
  ]
};

const prerequisiteUnits = Object.entries(PREREQUISITE_RAW_DATA).map(([subject, urls], uIndex) => {
  return {
    id: `PREREQ_U_${uIndex}`,
    subject,
    title: `المكتسبات القبلية | ${subject}`,
    videos: urls.map((url, vIndex) => {
      const videoId = getYoutubeId(url);
      const paddedIndex = String(vIndex + 1).padStart(2, '0');
      return {
        id: `PREREQ_${uIndex}_V_${vIndex}`,
        title: `الدرس ${paddedIndex}`,
        videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        url
      };
    })
  };
});

function VideosSection({
  onOpenModal,
  currentView,
  setCurrentView,
  selectedSubject,
  setSelectedSubject,
  selectedTeacher,
  setSelectedTeacher,
  selectedUnitId,
  setSelectedUnitId,
  selectedVideoId,
  setSelectedVideoId,
  isPrerequisites = false
}: {
  onOpenModal: (content: {type: 'video', url: string, title: string}) => void;
  currentView: 'subjects' | 'teachers' | 'lessons';
  setCurrentView: React.Dispatch<React.SetStateAction<'subjects' | 'teachers' | 'lessons'>>;
  selectedSubject: string | null;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTeacher: any | null;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<any | null>>;
  selectedUnitId: string | null;
  setSelectedUnitId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedVideoId: string | null;
  setSelectedVideoId: React.Dispatch<React.SetStateAction<string | null>>;
  isPrerequisites?: boolean;
}) {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const unitsSource = isPrerequisites ? prerequisiteUnits : UNITS_DATA;
  const activeSubjects = isPrerequisites ? ['علوم الطبيعة والحياة', 'الرياضيات', 'العلوم الفيزيائية', 'اللغة الفرنسية'] : SUBJECTS;

  const [trialInfo, setTrialInfo] = useState<{ isTrial: boolean; remainingText: string } | null>(null);

  useEffect(() => {
    const isAct = localStorage.getItem('bacline_activated') === 'true';
    if (!isAct && isPrerequisites) {
      const visitTimeStr = localStorage.getItem('bacline_first_visit');
      if (visitTimeStr) {
        const visitTime = parseInt(visitTimeStr, 10);
        const elapsed = Date.now() - visitTime;
        const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
        const remaining = Math.max(0, threeDaysMs - elapsed);
        
        if (remaining > 0) {
          const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
          const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
          
          let text = '';
          if (days > 0) {
            text = `${days} يوم و ${hours} ساعة`;
          } else if (hours > 0) {
            text = `${hours} ساعة و ${minutes} دقيقة`;
          } else {
            text = `${minutes} دقيقة`;
          }
          setTrialInfo({ isTrial: true, remainingText: text });
        }
      }
    } else {
      setTrialInfo(null);
    }
  }, [isPrerequisites]);

  const SUBJECT_METADATA: Record<string, {
    englishName: string;
    icon: React.ComponentType<any>;
    color: string;
    textColor: string;
    description: string;
    teachers: {
      name: string;
      avatar: string;
      role: string;
      rating: string;
      students: string;
      description: string;
      unitIds?: string[];
    }[];
  }> = {
    'الرياضيات': {
      englishName: 'Mathematics',
      icon: Calculator,
      color: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
      textColor: 'text-orange-500 dark:text-orange-400',
      description: 'الجبر، التحليل، الاحتمالات والأعداد المركبة مع شرح تطبيقي لحل المسائل المعقدة.',
      teachers: [
        {
          name: 'الأستاذ عبد الباسط',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ مادة الرياضيات',
          rating: '4.9 ★',
          students: '+240 ألف طالب',
          description: 'صاحب أسلوب التبسيط الخارق في شرح الدوال والمتتاليات والبرهان بالتراجع.'
        }
      ]
    },
    'العلوم الفيزيائية': {
      englishName: 'Physics & Chemistry',
      icon: Atom,
      color: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
      textColor: 'text-blue-500 dark:text-blue-400',
      description: 'المتابعة الزمنية، الميكانيك، الكهرباء والأسترة بأسلوب تجريبي مميز.',
      teachers: [
        {
          name: 'الأستاذ أحمد ترير',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ العلوم الفيزيائية',
          rating: '4.9 ★',
          students: '+180 ألف طالب',
          description: 'صاحب المنهجية المتكاملة للعلامة الكاملة في الفيزياء لجميع الشعب العلمية.'
        }
      ]
    },
    'علوم الطبيعة والحياة': {
      englishName: 'Natural Sciences',
      icon: Dna,
      color: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
      textColor: 'text-emerald-500 dark:text-emerald-400',
      description: 'تركيب البروتين، المناعة، الاتصال العصبي والجيولوجيا وفق المنهجية الجديدة.',
      teachers: [
        {
          name: 'الأستاذ عقبة',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ علوم الطبيعة والحياة',
          rating: '4.8 ★',
          students: '+150 ألف طالب',
          description: 'خبير تفكيك نصوص العلوم الطبيعية وشرح المنهجية وتدريب الطلاب على صياغة الإجابات النموذجية.'
        }
      ]
    },
    'العلوم الإسلامية': {
      englishName: 'Islamic Sciences',
      icon: Compass,
      color: 'from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20',
      textColor: 'text-teal-500 dark:text-teal-400',
      description: 'أحكام التجويد، مصادر التشريع الإسلامي، والدروس المقررة للبكالوريا.',
      teachers: [
        {
          name: 'الأستاذ بوسعادي',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ العلوم الإسلامية',
          rating: '4.9 ★',
          students: '+300 ألف طالب',
          description: 'المرجع الجزائري الأول لتلخيص دروس الشريعة الإسلامية والحصول على الـ 20 بكل ثقة.'
        }
      ]
    },
    'الفلسفة': {
      englishName: 'Philosophy',
      icon: Brain,
      color: 'from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20',
      textColor: 'text-purple-500 dark:text-purple-400',
      description: 'جدليات الحتمية، البيولوجيا، العنف والتسامح، الشعور بالأنا والغير وصياغة المقالات.',
      teachers: [
        {
          name: 'الأستاذ هواري',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ مادة الفلسفة',
          rating: '4.8 ★',
          students: '+120 ألف طالب',
          description: 'صاحب طريقة "الجدل الاحترافي" لتحرير مقال فلسفي متكامل يحوز إعجاب المصححين.',
          unitIds: ['PHIL_HOWARI_ALL']
        },
        {
          name: 'الأستاذة ضيف',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذة مادة الفلسفة',
          rating: '4.9 ★',
          students: '+140 ألف طالب',
          description: 'مبدعة المخططات الذهنية والخرائط الفلسفية لتبسيط الفكر والمذاهب لجميع الشعب.',
          unitIds: ['PHIL_DEIF_ALL']
        }
      ]
    },
    'اللغة العربية وآدابها': {
      englishName: 'Arabic Literature',
      icon: BookOpen,
      color: 'from-rose-500/10 to-red-500/10 dark:from-rose-500/20 dark:to-red-500/20',
      textColor: 'text-rose-500 dark:text-rose-400',
      description: 'البناء الفكري واللغوي، عصر الضعف والانحطاط، شعر المهجر والصور البيانية.',
      teachers: [
        {
          name: 'الأستاذ بوبكر',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ اللغة العربية',
          rating: '4.9 ★',
          students: '+210 ألف طالب',
          description: 'خبير أسئلة البناء الفكري وإعراب الجمل وأسرار التلخيص والحصول على العلامة الكاملة.',
          unitIds: ['ARA_BOUBAKER']
        },
        {
          name: 'الأستاذ حيقون',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ الأدب العربي',
          rating: '4.9 ★',
          students: '+250 ألف طالب',
          description: 'مؤسس حصص "ليلة الرعد" الشهيرة التي تنقذ آلاف الطلاب ليلة الامتحان بمراجعة شاملة وخارقة.',
          unitIds: ['ARA_HAYKOUN']
        }
      ]
    },
    'اللغة الفرنسية': {
      englishName: 'French Language',
      icon: Languages,
      color: 'from-sky-500/10 to-blue-500/10 dark:from-sky-500/20 dark:to-sky-500/20',
      textColor: 'text-sky-500 dark:text-sky-400',
      description: 'Le texte historique, le compte rendu objectif et critique, et le texte argumentatif.',
      teachers: [
        {
          name: 'الأستاذة نجاح',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذة اللغة الفرنسية',
          rating: '4.8 ★',
          students: '+95 ألف طالب',
          description: 'مبسطة منهجية كتابة الـ Compte Rendu بأسلوب مميز يضمن النقاط كاملة.'
        }
      ]
    },
    'اللغة الإنجليزية': {
      englishName: 'English Language',
      icon: Languages,
      color: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-violet-500/20',
      textColor: 'text-violet-500 dark:text-violet-400',
      description: 'Ethics in Business, Ancient Civilizations, Grammar rules, and writing high-scoring compositions.',
      teachers: [
        {
          name: 'الأستاذ منصوري',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
          role: 'أستاذ اللغة الإنجليزية',
          rating: '4.8 ★',
          students: '+110 ألف طالب',
          description: 'مبسط القواعد الأساسية وأسرار حل مواضيع البكالوريا بسهولة تامة.'
        }
      ]
    },
    'التاريخ والجغرافيا': {
      englishName: 'History & Geography',
      icon: Compass,
      color: 'from-stone-500/10 to-neutral-500/10 dark:from-stone-500/20 dark:to-neutral-500/20',
      textColor: 'text-stone-500 dark:text-stone-400',
      description: 'الحرب الباردة، الثورة التحريرية، الاقتصاد العالمي والخرائط الذهنية المقررة.',
      teachers: []
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 text-right"
      dir="rtl"
    >
      {/* Cinematic Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            {isPrerequisites ? <Brain className="w-8 h-8" /> : <PlayCircle className="w-8 h-8" />}
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {isPrerequisites ? 'المكتسبات القبلية والمراجعة الأساسية' : 'شروحات وفيديوهات البكالوريا'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
              {isPrerequisites 
                ? 'تصفح أهم الدروس والمكتسبات القبلية اللازمة لكل مادة لبناء أساس متين للبكالوريا.' 
                : 'تصفح أفضل الشروحات المرئية والدروس لجميع المواد والمحاور مع نخبة من أساتذة المادة.'}
            </p>
          </div>
        </div>

      </div>

      {/* Trial Countdown Banner for Prerequisites */}
      {trialInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-transparent border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ direction: 'rtl' }}
        >
          <div className="flex items-center gap-3 text-right">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
            <p className="text-sm font-bold text-slate-200 leading-relaxed">
              تنبيه: أنت الآن تستفيد من <strong className="text-blue-400">فترة المعاينة المجانية</strong> لقسم المكتسبات القبلية دون تفعيل.
            </p>
          </div>
          <div className="px-4 py-2 bg-slate-950/80 rounded-xl border border-white/5 text-xs font-black text-blue-400 shadow-sm shrink-0">
            الوقت المتبقي: {trialInfo.remainingText} ⏳
          </div>
        </motion.div>
      )}

      {/* Inline alert for subjects with no active content */}
      {alertMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-sm flex items-center justify-between flex-row-reverse"
        >
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage(null)} className="p-1 rounded-lg hover:bg-amber-500/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Main View Switcher with Slide Transitions */}
      <AnimatePresence mode="wait">
        {currentView === 'subjects' && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSubjects.map((subjectName) => {
                const meta = SUBJECT_METADATA[subjectName] || {
                  englishName: 'Subject',
                  icon: BookOpen,
                  color: 'from-slate-500/10 to-slate-600/10',
                  textColor: 'text-slate-500',
                  description: 'محتوى تعليمي ومحاضرات مميزة قيد التحضير.',
                  teachers: []
                };
                const IconComponent = meta.icon;
                const unitsCount = unitsSource.filter(u => u.subject === subjectName).length;
                const videosCount = unitsSource.filter(u => u.subject === subjectName).reduce((acc, u) => acc + u.videos.length, 0);

                return (
                  <motion.div
                    key={subjectName}
                    whileHover={{ y: -6, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      setAlertMessage(null);
                      if (meta.teachers.length === 0) {
                        setAlertMessage(`⚠️ تنبيه: سيتم توفير محتوى الفيديوهات والشروحات لمادة "${subjectName}" قريباً جداً في bacline. تابعونا!`);
                        return;
                      }
                      setSelectedSubject(subjectName);
                      if (meta.teachers.length > 1) {
                        setCurrentView('teachers');
                      } else {
                        setSelectedTeacher(meta.teachers[0]);
                        setCurrentView('lessons');
                      }
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl hover:bg-slate-900/80 hover:border-blue-500/25 transition-all duration-300 flex flex-col justify-between h-[230px] text-right hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
                  >
                    {/* Glow backdrop on hover */}
                    <div className={`absolute -right-12 -top-12 w-28 h-28 bg-gradient-to-br ${meta.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                    
                    <div className="space-y-4">
                      {/* Top Row: Title/Sub on Right, Icon on Left */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-right">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/80 mb-1 block font-mono">
                            {meta.englishName || 'SUBJECT'}
                          </span>
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight">
                            {subjectName}
                          </h3>
                        </div>
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${meta.color} ${meta.textColor} border border-white/10 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                          <IconComponent className="w-5.5 h-5.5" />
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">
                        {meta.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-bold">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <span className="text-slate-200 font-black font-mono">{unitsCount}</span>
                        <span>محاور</span>
                        <span className="text-slate-700 font-light">•</span>
                        <span className="text-slate-200 font-black font-mono">{videosCount}</span>
                        <span>درس</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 font-extrabold group-hover:translate-x-[-4px] transition-transform duration-300">
                        <span>تصفح المادة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {currentView === 'teachers' && (
          <motion.div
            key="teachers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Header with back button */}
            <div className="flex items-center justify-between flex-row-reverse pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="text-right">
                <span className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider">خطوة 2: اختر الأستاذ والمدرسة</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">أساتذة مادة {selectedSubject}</h3>
              </div>
              <button
                onClick={() => {
                  setCurrentView('subjects');
                  setSelectedSubject(null);
                  setSelectedTeacher(null);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-extrabold transition-all hover:scale-105 cursor-pointer text-sm"
              >
                <span>← عودة للمواد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {selectedSubject && SUBJECT_METADATA[selectedSubject]?.teachers.map((teacher) => (
                <motion.div
                  key={teacher.name}
                  whileHover={{ y: -8, scale: 1.015 }}
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setCurrentView('lessons');
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl flex flex-col md:flex-row-reverse items-center gap-6 hover:bg-slate-900/80 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]"
                >
                  {/* Circular Avatar with Accent Ring */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-blue-500/20 dark:border-blue-500/30 shadow-md shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:border-blue-500">
                    <Image
                      src={teacher.avatar}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-right space-y-2">
                    <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-2">
                      <h4 className="text-lg sm:text-xl font-extrabold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {teacher.name}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-row-reverse text-xs font-bold">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">{teacher.rating}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">{teacher.students}</span>
                      </div>
                    </div>
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500">{teacher.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {teacher.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {currentView === 'lessons' && (
          <motion.div
            key="lessons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {selectedUnitId ? (
              // Active player view
              <div className="space-y-6">
                {/* Back to lessons button */}
                <div className="flex items-center justify-between flex-row-reverse pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="text-right">
                    <span className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider">مشاهدة الدرس الآن</span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white truncate max-w-[280px] sm:max-w-lg">
                      {UNITS_DATA.find(u => u.id === selectedUnitId)?.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedUnitId(null);
                      setSelectedVideoId(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-extrabold transition-all hover:scale-105 cursor-pointer text-sm"
                  >
                    <span>← عودة للمحاور</span>
                  </button>
                </div>

                {/* Cinematic playlist player */}
                {(() => {
                  const selectedUnit = unitsSource.find(u => u.id === selectedUnitId);
                  if (!selectedUnit) return null;
                  
                  return (
                    <div className="bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden shadow-xl backdrop-blur-xl flex flex-col lg:flex-row h-auto lg:h-[580px] transition-all duration-300">
                      {/* Main Video Player */}
                      <div className="w-full lg:w-2/3 h-[250px] sm:h-[400px] lg:h-full bg-black relative">
                        {selectedVideoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full border-0"
                          ></iframe>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400 flex-col gap-4 p-6">
                            <PlayCircle className="w-16 h-16 opacity-40 text-blue-500 animate-pulse" />
                            <p className="font-bold">يرجى اختيار فيديو للمشاهدة من القائمة</p>
                          </div>
                        )}
                      </div>

                      {/* Playlist sidebar */}
                      <div className="w-full lg:w-1/3 flex flex-col h-full bg-slate-950/40 border-r border-white/5">
                        <div className="p-5 border-b border-white/5 bg-slate-900/40">
                          <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider">قائمة التشغيل</span>
                          <h3 className="font-extrabold text-sm text-slate-100 whitespace-normal break-words mt-1 leading-snug" style={{ whiteSpace: 'normal' }}>
                            {selectedUnit.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-bold">{selectedUnit.videos.length} دروس متوفرة</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                          {selectedUnit.videos.map((video, idx) => {
                            const videoYtId = video.videoId || video.id;
                            const isActive = selectedVideoId === videoYtId;
                            return (
                              <button 
                                key={video.id} 
                                onClick={() => setSelectedVideoId(videoYtId)}
                                className={`w-full text-right flex gap-3 p-2 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-1 border ${
                                  isActive 
                                    ? 'bg-blue-500/20 border-blue-500/40 shadow-xs' 
                                    : 'hover:bg-slate-800/40 border-transparent'
                                }`}
                              >
                                {/* Video Thumbnail */}
                                <div className="relative w-28 shrink-0 aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xs">
                                  <Image 
                                    src={`https://img.youtube.com/vi/${videoYtId}/mqdefault.jpg`}
                                    alt={video.title}
                                    fill
                                    className="object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-black text-white font-mono">
                                    {String(idx + 1).padStart(2, '0')}
                                  </div>
                                  {isActive && (
                                    <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center backdrop-blur-[1px]">
                                      <PlayCircle className="w-7 h-7 text-white drop-shadow-md" />
                                    </div>
                                  )}
                                </div>

                                {/* Video Title */}
                                <div className="flex-1 py-1 flex flex-col justify-center">
                                  <h4 className={`font-bold text-xs whitespace-normal break-words leading-relaxed line-clamp-2 ${
                                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'
                                  }`} style={{ whiteSpace: 'normal' }}>
                                    {video.title}
                                  </h4>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              // Units grid view
              <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between flex-row-reverse pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="text-right">
                    <span className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider">خطوة 3: اختر المحور الدراسي</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                      {selectedSubject && SUBJECT_METADATA[selectedSubject]?.teachers.length > 1 
                        ? `محاضرات ${selectedTeacher?.name}` 
                        : `محاور مادة ${selectedSubject}`}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedSubject && SUBJECT_METADATA[selectedSubject]?.teachers.length > 1) {
                        setCurrentView('teachers');
                      } else {
                        setCurrentView('subjects');
                        setSelectedSubject(null);
                      }
                      setSelectedTeacher(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-extrabold transition-all hover:scale-105 cursor-pointer text-sm"
                  >
                    <span>{selectedSubject && SUBJECT_METADATA[selectedSubject]?.teachers.length > 1 ? '← عودة للأساتذة' : '← عودة للمواد'}</span>
                  </button>
                </div>

                {/* Grid of Lessons/Units */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(() => {
                    const subjectUnits = unitsSource.filter(u => u.subject === selectedSubject);
                    const filteredUnits = selectedTeacher && selectedTeacher.unitIds 
                      ? subjectUnits.filter(u => selectedTeacher.unitIds.includes(u.id))
                      : subjectUnits;

                    if (filteredUnits.length === 0) {
                      return (
                        <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-xl">
                          <BookOpenCheck className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-65" />
                          <p className="font-extrabold">سيتم إضافة المحاضرات والدروس لهذا المعلم قريباً.</p>
                        </div>
                      );
                    }

                    return filteredUnits.map((unit) => {
                      const firstVideoId = unit.videos[0]?.videoId || unit.videos[0]?.id || "";
                      return (
                        <motion.div
                          key={unit.id}
                          whileHover={{ y: -6, scale: 1.015 }}
                          onClick={() => {
                            setSelectedUnitId(unit.id);
                            if (unit.videos.length > 0) {
                              setSelectedVideoId(unit.videos[0].videoId || unit.videos[0].id);
                            }
                          }}
                          className="group cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:bg-slate-900 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col h-[280px]"
                        >
                          {/* High-quality Thumbnail Cover */}
                          <div className="relative w-full h-40 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            {firstVideoId ? (
                              <Image
                                src={`https://img.youtube.com/vi/${firstVideoId}/hqdefault.jpg`}
                                alt={unit.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <PlayCircle className="w-12 h-12 opacity-50" />
                              </div>
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                            
                            {/* Duration/Count Badge */}
                            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-blue-600/95 text-[10px] font-black text-white shadow-xs flex items-center gap-1">
                              <PlayCircle className="w-3.5 h-3.5" />
                              {unit.videos.length} {unit.videos.length === 1 ? 'درس' : unit.videos.length === 2 ? 'درسين' : 'دروس'}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="p-4 flex-1 flex flex-col justify-between text-right">
                            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed">
                              {unit.title}
                            </h4>
                            
                            <div className="flex items-center justify-between flex-row-reverse text-xs font-bold text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/40 dark:border-white/5 mt-2">
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold">مشاهدة فورية</span>
                              <div className="flex items-center gap-1 group-hover:translate-x-[-3px] transition-transform text-blue-500 font-extrabold">
                                <span>دخول المحور</span>
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Utility icon component
function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a2 2 0 0 1-.01 3.016l-7.117 6.961a2 2 0 0 1-2.634.081L2.645 13.84a2 2 0 0 1-.02-3.003l8.443-8.331a2 2 0 0 1 2.766-.057l7.586 8.473Z" />
      <path d="M14 11.5v6" />
      <path d="M10 11.5v6" />
      <path d="M22 14v6" />
      <path d="M2 14v6" />
    </svg>
  );
}

// --- NEW COMPONENTS ---

const TIMER_OPTIONS = [
  { label: '4 ساعات ونصف', value: '04:30' },
  { label: '4 ساعات', value: '04:00' },
  { label: '3 ساعات ونصف', value: '03:30' },
  { label: '3 ساعات', value: '03:00' },
  { label: 'ساعتان ونصف', value: '02:30' },
  { label: 'ساعتان', value: '02:00' },
  { label: 'ساعة ونصف', value: '01:30' },
  { label: 'ساعة واحدة', value: '01:00' },
  { label: '45 دقيقة', value: '00:45' },
  { label: '30 دقيقة', value: '00:30' },
  { label: '15 دقيقة', value: '00:15' },
];

function ExamTimerWidget({ isZenMode, onStartChallenge, onToggleZenMode }: { isZenMode?: boolean, onStartChallenge?: () => void, onToggleZenMode?: () => void }) {
  const [durationStr, setDurationStr] = useState('02:00'); // HH:MM
  const [timeLeft, setTimeLeft] = useState(2 * 3600); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const getDurationSeconds = (str: string) => {
    const [hours, minutes] = str.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
  };

  const handleDurationChange = (val: string) => {
    setDurationStr(val);
    if (!isActive) {
      setTimeLeft(getDurationSeconds(val));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (interval) clearInterval(interval);
      setIsActive(false);
      setIsAlertOpen(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (!isActive && timeLeft === getDurationSeconds(durationStr)) {
      if (onStartChallenge) onStartChallenge();
    }
    if (!isActive && timeLeft === 0) {
      setTimeLeft(getDurationSeconds(durationStr));
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDurationSeconds(durationStr));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isZenMode) {
    return (
      <div className="absolute bottom-8 left-8 z-50 flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-4 rounded-3xl flex items-center gap-6 shadow-2xl pointer-events-auto transition-all hover:bg-slate-900/80 group">
          <div className="text-4xl font-mono font-black tracking-wider text-slate-100" dir="ltr">
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={toggleTimer}
              className={`p-3 rounded-2xl ${isActive ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/40' : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/40'} transition-all active:scale-95`}
              title={isActive ? "إيقاف مؤقت" : "استئناف"}
            >
              {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <button 
              onClick={resetTimer}
              className="p-3 rounded-2xl bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all active:scale-95"
              title="إعادة تعيين"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isAlertOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="p-4 bg-red-900/80 backdrop-blur-md text-red-200 border border-red-800 rounded-2xl flex items-center justify-between shadow-xl pointer-events-auto"
            >
              <span className="font-bold">انتهى الوقت!</span>
              <button 
                onClick={() => setIsAlertOpen(false)}
                className="p-2 hover:bg-red-800/50 rounded-xl ml-4 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-5 shrink-0 transition-colors">
      <div className="flex flex-col gap-4">
        {(!isActive && timeLeft === getDurationSeconds(durationStr)) && (
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              تحدي الوقت
            </h4>
            <div className="flex items-center gap-2">
              {onToggleZenMode && (
                 <button 
                   onClick={onToggleZenMode}
                   className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors ml-2"
                   title="تفعيل وضع الانعزال"
                 >
                   <Moon className="w-4 h-4" />
                 </button>
              )}
              <select 
                value={durationStr}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 border rounded-lg px-3 py-1.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm transition-colors"
                disabled={isActive}
              >
                {TIMER_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
          <div className="text-4xl font-mono font-black tracking-wider text-slate-800 dark:text-slate-100" dir="ltr">
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-2">
            {!isActive && timeLeft === getDurationSeconds(durationStr) ? (
               <button 
                 onClick={toggleTimer}
                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95"
               >
                 <Play className="w-4 h-4 fill-current" />
                 ابدأ التحدي
               </button>
            ) : (
               <>
                 <button 
                   onClick={toggleTimer}
                   className={`p-3 rounded-xl ${isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-400'} transition-all active:scale-95 shadow-sm`}
                   title={isActive ? "إيقاف مؤقت" : "استئناف"}
                 >
                   {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                 </button>
                 <button 
                   onClick={resetTimer}
                   className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 transition-all active:scale-95 shadow-sm"
                   title="إعادة تعيين"
                 >
                   <RotateCcw className="w-5 h-5" />
                 </button>
               </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAlertOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-xl flex items-center justify-between shadow-sm">
              <span className="font-bold">انتهى الوقت المخصص للامتحان! حان وقت التقييم.</span>
              <button 
                onClick={() => setIsAlertOpen(false)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SmartNotepad({ title }: { title: string }) {
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`notes_${title}`);
    if (saved) setNote(saved);
    else setNote('');
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNote(val);
    localStorage.setItem(`notes_${title}`, val);
  };

  const handleDownload = () => {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title} - ملاحظات.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between transition-colors duration-300">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Notebook className="w-5 h-5" />
          مفكرتي الذكية
        </h4>
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md tracking-wider">حفظ تلقائي</span>
      </div>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="اكتب ملاحظاتك هنا..."
        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none text-slate-700 dark:text-slate-300 leading-relaxed text-base placeholder-slate-400 dark:placeholder-slate-500"
      />
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300">
        <button
          onClick={handleDownload}
          disabled={!note.trim()}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4" />
          تحميل الملاحظات (TXT)
        </button>
      </div>
    </div>
  );
}

function SavedNotesSection() {
  const [notes, setNotes] = useState<{title: string, content: string}[]>([]);

  const loadNotes = () => {
    const loadedNotes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('notes_')) {
        const content = localStorage.getItem(key);
        if (content && content.trim() !== '') {
          loadedNotes.push({
            title: key.replace('notes_', ''),
            content
          });
        }
      }
    }
    setNotes(loadedNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = (title: string) => {
    if(confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
      localStorage.removeItem(`notes_${title}`);
      loadNotes();
    }
  };

  const handleUpdate = (title: string, newContent: string) => {
    if (newContent.trim() === '') {
      localStorage.removeItem(`notes_${title}`);
    } else {
      localStorage.setItem(`notes_${title}`, newContent);
    }
    loadNotes();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Cinematic Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs animate-in fade-in-50 duration-500">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Notebook className="w-8 h-8" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              دفتر ملاحظاتي المحفوظة
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
              راجع جميع الملاحظات الشخصية والأفكار التي دونتها أثناء رحلة المذاكرة لمراجعتها وتثبيتها بكل سهولة.
            </p>
          </div>
        </div>
        <div className="z-10 flex gap-2 shrink-0">
          <span className="px-3.5 py-1.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-full text-xs font-black text-slate-700 dark:text-slate-300 shadow-xs">
            {notes.length} ملاحظة محفوظة
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.length > 0 ? notes.map((note, idx) => (
          <SavedNoteCard key={idx} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
        )) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
            <Notebook className="w-16 h-16 mb-4 text-slate-200 dark:text-slate-600" />
            <p className="text-lg">لا توجد ملاحظات محفوظة حالياً. افتح فيديو أو كتاباً وابدأ التدوين!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const successVideos = [
  {
    id: "0z4ZUSkoWok",
    title: "#TamayazPodcast ep1 with Mokrane mohammed amine - مقران محمد أمين الأول وطنيا في البكالوريا 19.62",
  },
  {
    id: "aNpVzrq_YXE",
    title: "#TamayazPodcast ep9 with wissal oulem : المرتبة الثالثة وطنيا في البكالوريا 19,52 قصتها الكاملة",
  },
  {
    id: "EhvueDKh-pg",
    title: "محمد الأمين قداش يكشف سبب تفوقه وتحصله على المرتبة الأولى وطنيا في البكالوريا",
  },
  {
    id: "xZB6s-XG0J8",
    title: "نهار قبل الباك .. نسيت كلش 😱 ..قصة صاحبة المرتبة الثانية ولائيا في البكالوريا",
  },
  {
    id: "8asdkghlcpA",
    title: "#FluentlyTalk Ep 06 with @BelkadiManel-zw2ol - كيفاه نقدر نجيب الباك ب 18 و 19",
  },
  {
    id: "ZShVaTuM6DI",
    title: "بودكاست خطوة نحو النجاح الحلقة09:كيفاش نقرا فرنسي في اقل من 15يوم من الباك+علاش ميمدوش على التلخيص🇫🇷",
  },
  {
    id: "GIagWB3V-QA",
    title: "بودكاست خطوة نحو النجاح الحلقة03: نصائح وأسرار تخليك طور مستواك في اللغة الانجليزية",
  },
  {
    id: "G6lWAsDLacM",
    title: "بودكاست خطوة نحو النجاح الحلقة06: كيف تراجع الرياضيات بذكاء في الفترة الأخيرة قبل الباك؟",
  }
];

function SuccessStoriesSection({ onOpenModal }: { onOpenModal: (content: { type: 'pdf' | 'video' | 'drive', url: string, title?: string }) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Cinematic Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs animate-in fade-in-50 duration-500">
        <div className="absolute inset-0 bg-gradient-to-l from-amber-500/10 via-yellow-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-amber-500 to-yellow-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
            <Sparkles className="w-8 h-8 text-yellow-100" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              تجارب ونصائح الناجحين
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
              استلهم من تجارب وقصص نجاح أبطال البكالوريا السابقين، واكتشف أسرار تفوقهم والمناهج التي اعتمدوها للوصول إلى أعلى المراتب.
            </p>
          </div>
        </div>
        <div className="z-10 flex gap-2 shrink-0">
          <span className="px-3.5 py-1.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-full text-xs font-black text-slate-700 dark:text-slate-300 shadow-xs">
            {successVideos.length} قصص ملهمة
          </span>
        </div>
      </div>

      {/* Grid of Success Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {successVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => onOpenModal({
              type: 'video',
              url: `https://www.youtube.com/embed/${video.id}?autoplay=1`,
              title: video.title
            })}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:bg-slate-900 hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col h-[280px]"
          >
            {/* High-quality Thumbnail Cover */}
            <div className="relative w-full h-40 bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[1px]">
                <div className="p-3.5 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-90 group-hover:scale-100 transition-transform duration-300">
                  <PlayCircle className="w-8 h-8 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between text-right">
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-relaxed">
                {video.title}
              </h4>
              
              <div className="flex items-center justify-between flex-row-reverse text-xs font-bold text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/40 dark:border-white/5 mt-2">
                <span className="text-[10px] text-amber-500 font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  قصة نجاح
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-[-3px] transition-transform text-amber-500 font-extrabold">
                  <span>شاهد الآن</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SavedNoteCard({ note, onDelete, onUpdate }: { note: {title: string, content: string}, onDelete: (t:string)=>void, onUpdate: (t:string, c:string)=>void }) {
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(note.title, content);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-white/5 p-6 flex flex-col h-80 group hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-300">
       <div className="flex justify-between items-start mb-4 gap-3">
         <h3 className="font-bold text-slate-100 text-lg line-clamp-2 flex-1 leading-snug" title={note.title}>{note.title}</h3>
         <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
           {isEditing ? (
             <button onClick={handleSave} className="text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50 p-2 rounded-lg transition-colors font-bold text-sm">
               حفظ
             </button>
           ) : (
             <button onClick={() => setIsEditing(true)} className="text-blue-400 hover:text-blue-300 bg-blue-950/30 hover:bg-blue-950/50 p-2 rounded-lg transition-colors" title="تعديل الملاحظة">
               <Edit className="w-4 h-4" />
             </button>
           )}
           <button onClick={() => onDelete(note.title)} className="text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 p-2 rounded-lg transition-colors" title="حذف الملاحظة">
             <Trash2 className="w-4 h-4" />
           </button>
         </div>
       </div>
       <div className={`flex-1 rounded-xl overflow-hidden transition-all ${isEditing ? 'border-2 border-blue-500 ring-4 ring-blue-500/10' : 'border border-white/5 bg-slate-950/40'}`}>
         {isEditing ? (
            <textarea 
              className="w-full h-full p-5 resize-none focus:outline-none text-slate-300 bg-slate-900 text-base leading-relaxed placeholder-slate-500"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="اكتب ملاحظاتك..."
            />
         ) : (
            <div 
              className="w-full h-full p-5 overflow-y-auto text-slate-300 whitespace-pre-wrap text-base leading-relaxed custom-scrollbar bg-slate-900/20"
            >
              {content}
            </div>
         )}
       </div>
    </div>
  )
}

function HomeExtraTools() {
  const [activeTab, setActiveTab] = useState<'todo' | 'pomodoro'>('todo');

  // --- TODO LIST STATE & LOGIC ---
  const [todos, setTodos] = useState<{id: string, text: string, completed: boolean}[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('daily_todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveTodos = (newTodos: {id: string, text: string, completed: boolean}[]) => {
    setTodos(newTodos);
    localStorage.setItem('daily_todos', JSON.stringify(newTodos));
  };

  const addTodo = () => {
    if (!inputValue.trim()) return;
    saveTodos([...todos, { id: Date.now().toString(), text: inputValue.trim(), completed: false }]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id: string) => {
    saveTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  // --- POMODORO TIMER STATE & LOGIC ---
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [totalCompletedCycles, setTotalCompletedCycles] = useState(0);
  const [pomodoroMessage, setPomodoroMessage] = useState<string | null>(null);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    
    if (pomodoroActive) {
      timerInterval = setInterval(() => {
        if (pomodoroSeconds > 0) {
          setPomodoroSeconds(prev => prev - 1);
        } else if (pomodoroMinutes > 0) {
          setPomodoroMinutes(prev => prev - 1);
          setPomodoroSeconds(59);
        } else {
          setPomodoroActive(false);
          if (pomodoroMode === 'work') {
            setPomodoroMessage('أحسنتم! انتهت حصة العمل (25 دقيقة). حان وقت الاستراحة الآن 🎉');
            setPomodoroMode('break');
            setPomodoroMinutes(5);
            setPomodoroSeconds(0);
            setTotalCompletedCycles(prev => prev + 1);
          } else {
            setPomodoroMessage('انتهت الاستراحة! حان وقت العودة للتركيز والعمل 💪');
            setPomodoroMode('work');
            setPomodoroMinutes(25);
            setPomodoroSeconds(0);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [pomodoroActive, pomodoroMinutes, pomodoroSeconds, pomodoroMode]);

  const handlePomodoroReset = () => {
    setPomodoroActive(false);
    setPomodoroMode('work');
    setPomodoroMinutes(25);
    setPomodoroSeconds(0);
    setPomodoroMessage(null);
  };

  const handlePomodoroModeChange = (newMode: 'work' | 'break') => {
    setPomodoroActive(false);
    setPomodoroMode(newMode);
    setPomodoroMinutes(newMode === 'work' ? 25 : 5);
    setPomodoroSeconds(0);
    setPomodoroMessage(null);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden" id="home-extra-tools">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Toggle Switches */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3.5 flex-row-reverse text-right w-full md:w-auto">
          <div className="p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              أدوات الدراسة الذكية
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              نظم مهامك الدراسية اليومية وركّز وقتك باستخدام مؤقت بومودورو الفعّال
            </p>
          </div>
        </div>

        {/* Dynamic Segmented Toggle */}
        <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-white/5 flex gap-2 w-full md:w-80" dir="rtl">
          <button
            onClick={() => setActiveTab('todo')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'todo'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>قائمة المهام</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'pomodoro'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>مؤقت التركيز</span>
          </button>
        </div>
      </div>

      {/* Tab Contents with Transitions */}
      <AnimatePresence mode="wait">
        {activeTab === 'todo' ? (
          <motion.div
            key="todo-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10"
          >
            {/* INPUT FORM */}
            <div className="flex gap-2 mb-6" dir="rtl">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ما هي المهمة الدراسية التالية؟ (مثال: تلخيص درس العلوم الطبيعية)"
                className="flex-1 bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-slate-100 placeholder-slate-500 transition-colors duration-300"
              />
              <button 
                onClick={addTodo} 
                type="button" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/20 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                إضافة المهمة
              </button>
            </div>

            {/* TASKS LIST */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1" dir="rtl">
              {todos.length === 0 ? (
                <div className="text-center text-slate-400 py-14 border border-dashed border-white/5 rounded-2xl bg-slate-950/20">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="font-bold text-sm text-slate-300">قائمتك فارغة الآن.</p>
                  <p className="text-xs text-slate-500 mt-1">أدخل مهام اليوم لتسجيل تقدمك بنجاح!</p>
                </div>
              ) : (
                todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`group p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                      todo.completed
                        ? 'bg-blue-950/10 border-blue-500/10 opacity-70'
                        : 'bg-slate-900/50 border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80'
                    }`}
                  >
                    <div 
                      className="flex items-center gap-3.5 flex-1 cursor-pointer select-none" 
                      onClick={() => toggleTodo(todo.id)}
                    >
                      <div
                        className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center transition-all ${
                          todo.completed
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                            : 'bg-slate-950 border border-white/10 hover:border-blue-500/40'
                        }`}
                      >
                        {todo.completed && <CheckSquare className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`font-bold text-sm transition-all ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {todo.text}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => deleteTodo(todo.id)} 
                      className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer border border-transparent hover:border-rose-500/20" 
                      title="حذف المهمة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* TODO FOOTER SUMMARY */}
            {todos.length > 0 && (
              <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400" dir="rtl">
                <div className="flex gap-4">
                  <span>إجمالي المهام: <strong className="text-slate-200">{todos.length}</strong></span>
                  <span>المكتملة: <strong className="text-blue-400">{todos.filter(t => t.completed).length}</strong></span>
                </div>
                
                {/* Visual Progress bar */}
                <div className="w-full sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{
                      width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="pomodoro-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col items-center text-center py-4"
          >
            {/* Mode Selectors */}
            <div className="flex gap-2 mb-8 bg-slate-950/60 p-1.5 rounded-2xl border border-white/5" dir="rtl">
              <button
                onClick={() => handlePomodoroModeChange('work')}
                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer ${
                  pomodoroMode === 'work'
                    ? 'bg-indigo-600 text-white shadow-md border border-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                فترة التركيز (25 دقيقة)
              </button>
              <button
                onClick={() => handlePomodoroModeChange('break')}
                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer ${
                  pomodoroMode === 'break'
                    ? 'bg-purple-600 text-white shadow-md border border-purple-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                استراحة قصيرة (5 دقائق)
              </button>
            </div>

            {/* Circular Timer Display */}
            <div className="relative w-52 h-52 flex items-center justify-center mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="92"
                  className="stroke-slate-950 fill-transparent"
                  strokeWidth="6"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="92"
                  className={`fill-transparent transition-all duration-500 ${
                    pomodoroMode === 'work' ? 'stroke-indigo-500' : 'stroke-purple-500'
                  }`}
                  strokeWidth="6"
                  strokeDasharray={578}
                  strokeDashoffset={
                    578 - (578 * (pomodoroMinutes * 60 + pomodoroSeconds)) / (pomodoroMode === 'work' ? 25 * 60 : 5 * 60)
                  }
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 12px ${pomodoroMode === 'work' ? 'rgba(99,102,241,0.3)' : 'rgba(168,85,247,0.3)'})`
                  }}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black font-mono tracking-tighter text-white">
                  {pomodoroMinutes.toString().padStart(2, '0')}:{pomodoroSeconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-black text-slate-400 mt-1.5 tracking-wide font-mono uppercase">
                  {pomodoroMode === 'work' ? 'وقت المذاكرة والجد' : 'استراحة لتجديد النشاط'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setPomodoroActive(!pomodoroActive)}
                className={`px-6 py-3.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] ${
                  pomodoroActive
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/10'
                    : pomodoroMode === 'work'
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
                }`}
              >
                {pomodoroActive ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>إيقاف مؤقت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>بدء التركيز</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePomodoroReset}
                className="px-5 py-3.5 bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>

            {/* Notifications & Completed Status */}
            <div className="w-full max-w-sm">
              {pomodoroMessage && (
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-bold leading-relaxed mb-4 text-center">
                  {pomodoroMessage}
                </div>
              )}
              
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/40 rounded-xl border border-white/5 text-[11px] text-slate-400 font-bold font-mono" dir="rtl">
                <span>الدورات المكتملة اليوم:</span>
                <span className="text-indigo-400 font-black">{totalCompletedCycles} 🔥</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlannerSection() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'أدعية ومعلومات شخصية' },
    { id: 'tracker', label: 'متتبع المراجعة التفصيلي' },
    { id: 'examsTracker', label: 'متتبع البكالوريات' },
    { id: 'planning', label: 'التخطيط الزمني والأشهر' },
    { id: 'info', label: 'معلومات ومشتريات البكالوريا' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Cinematic Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 text-right flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl transition-all duration-300 shadow-xs animate-in fade-in-50 duration-500">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />
        <div className="z-10 flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              بلانر البكالوريا (نظام التخطيط)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">
              نظم وقتك، تتبع مراجعتك التفصيلية، واحسب علاماتك لتحقيق أهدافك خطوة بخطوة.
            </p>
          </div>
        </div>
        <div className="z-10 flex gap-2 shrink-0">
          <span className="px-3.5 py-1.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-full text-xs font-black text-slate-700 dark:text-slate-300 shadow-xs">
            تخطيط شامل
          </span>
          <span className="px-3.5 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full text-xs font-black shadow-xs">
            تنظيم ذكي
          </span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 min-h-[500px]">
        {activeTab === 'personal' && <PlannerPersonal />}
        {activeTab === 'tracker' && <PlannerTracker />}
        {activeTab === 'examsTracker' && <PlannerExamsTracker />}
        {activeTab === 'planning' && <PlannerPlanning />}
        {activeTab === 'info' && <PlannerInfo />}
      </div>
    </motion.div>
  );
}

// 1. PlannerPersonal
function PlannerPersonal() {
  const [profile, setProfile] = useState({ name: '', surname: '', school: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const p = localStorage.getItem('bac_profile');
    if (p) setProfile(JSON.parse(p));
    const m = localStorage.getItem('bac_future_message');
    if (m) setMessage(m);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...profile, [e.target.name]: e.target.value };
    setProfile(updated);
    localStorage.setItem('bac_profile', JSON.stringify(updated));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    localStorage.setItem('bac_future_message', e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* أدعية للمذاكرة */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          أدعية للمذاكرة
        </h3>
        <div className="space-y-4 text-emerald-900 dark:text-emerald-100 leading-relaxed font-medium">
          <p>لا إله إلا أنت سبحانك إني كنت من الظالمين يا مالك الملك، تؤتي الملك من تشاء وتنزع الملك ممن تشاء وتعز من تشاء وتذل من تشاء بيدك الخير إنك على كل شيء قدير... تولج الليل في النهار وتولج النهار في الليل وتخرج الحي من الميت وتخرج الميت من الحي وترزق من تشاء بغير حساب..</p>
          <p>يا رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقه قولي، افتح علي فتوح العارفين بفضلك.</p>
          <p>اللهم لا سهل إلا ما جعلته سهلا وأنت تجعل الحزن إن شئت سهلا, اللهم أني استودعتك ما علمتني إياه فرده إلي حين حاجتي إليه ولا تنسيني إياه بفضلك وكرمك يا أرحم الراحمين يا بديع السماوات والأرض, يا معلم سيدنا إبراهيم علمني و يا مفهم سيدنا سليمان فهمني و يا ملهم سيدنا يوسف ألهمني, اللهم انفعني بما علمتني وعلمني ما ينفعني. اللهم تقبل هذا العلم مني واجعل كل حرف وكلمة أدرسها خالصة لوجهك الكريم. ولا تجعلني أغتر بعلمي وقدراتي.</p>
          <p>يا رب كن معي فإني فقير إليك ضعيف من دونك ولا حول لي ولا قوة إلا بك وما بي من نعمة أو فضل أو اجتهاد فبفضلك أولا لا بجهدي واجتهادي فقط ، فلك الحمد ولك الفضل والثناء الحسن... اللهم أعني على الدراسة ولا تجعل قلبي يمل منها وكن معي في كل لحظة ووفقني لما تحب وترضى.</p>
          <p>اللهم لا تجعل الدرجات أكبر همي ومبلغ علمي ورضني بما قضيت لي... اللهم سهل علي ما صعب حفظه ويسر لي ما استغلق فهمه واجعل هذا العلم حجة لي لا علي... اللهم بارك لي في وقتي وأصلح لي شأني ولا تكلني إلى نفسي طرفة عين.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* معلوماتي الشخصية */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">معلوماتي الشخصية</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">الاسم</label>
              <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">اللقب</label>
              <input type="text" name="surname" value={profile.surname} onChange={handleProfileChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">الثانوية</label>
              <input type="text" name="school" value={profile.school} onChange={handleProfileChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-100" />
            </div>
          </div>
        </div>

        {/* رسالة لنفسي المستقبلية */}
        <div className="space-y-4 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Edit className="w-5 h-5" />
            رسالة لنفسي المستقبلية
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">اكتب رسالة إلى نفسك المستقبلية، عبّر فيها عن أحلامك، طموحاتك، والتحديات التي تأمل أن تتغلب عليها.</p>
          <textarea 
            value={message}
            onChange={handleMessageChange}
            placeholder="عزيزي أنا في المستقبل..."
            className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-100 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// 2. PlannerTracker
function PlannerTracker() {
  const subjects = [
    {
      name: 'علوم الطبيعة والحياة',
      units: [
        'مقر تركيب البروتين في الخلية',
        'انتقال المعلومة الوراثية',
        'آلية الاستنساخ',
        'الشفرة الوراثية',
        'آلية الترجمة',
        'العلاقة بين البنية والتخصص الوظيفي للبروتين',
        'النشاط الإنزيمي للبروتينات',
        'الذات واللاذات',
        'دور البروتينات في حالة الاستجابة المناعية الخلطية',
        'دور البروتينات في حالة الاستجابة المناعية الخلوية',
        'تحفيز الخلايا اللمفاوية (التعاون الخلوي)',
        'فقدان المناعة المكتسبة (فيروس VIH)',
        'آليات النقل المشبكي',
        'كمون الراحة',
        'كمون العمل',
        'الإدماج العصبي',
        'تأثير المخدرات',
        'مقر التركيب الضوئي ومراحله',
        'تحويل الطاقة الكيميائية الكامنة في الجزيئات إلى طاقة قابلة للاستعمال (ATP)',
        'تحويل الطاقة الكيميائية الكامنة في الوسط الهيولي (التنفس الخلوي)',
        'تحويل الطاقة الكيميائية الكامنة في الوسط الهيولي (التخمر)',
        'إنجاز حصيلة التحولات الطاقوية على المستوى الخلوي في شكل مخطط',
        'بنية الكرة الأرضية',
        'حركات الصفائح التكتونية (حركة التباعد / حركة التقارب)',
        'الطاقة الداخلية للكرة الأرضية',
        'الظواهر المرتبطة بالبناء على مستوى الظهرة',
        'الظواهر المرتبطة بالغوص'
      ]
    },
    {
      name: 'العلوم الفيزيائية',
      units: [
        'المتابعة الزمنية',
        'تطور جملة ميكانيكية',
        'الضواهر الكهربائية',
        'تطور جملة ميكانيكية نحو حالة التوازن',
        'التحولات النووية',
        'التطورات المهتزة',
        'مفهوم الموجة'
      ]
    },
    {
      name: 'الرياضيات',
      units: [
        'الدوال',
        'الدوال الأسية و اللوغارتمية',
        'المتتاليات',
        'الدوال الأصلية',
        'الإحتمالات',
        'الأعداد المركبة',
        'الهندسة في الفضاء'
      ]
    },
    {
      name: 'العلوم الإسلامية',
      units: [
        'العقيدة الإسلامية وأثرها على الفرد والمجتمع',
        'وسائل القرآن في تثبيت العقيدة الإسلامية',
        'الإسلام والرسالات السماوية',
        'العقل في القرآن الكريم',
        'مقاصد الشريعة الإسلامية',
        'منهج الإسلام في محاربة الانحراف والجريمة',
        'المساواة أمام أحكام الشريعة الإسلامية في العقوبات',
        'الصحة النفسية والجسدية في القرآن الكريم',
        'من مصادر التشريع الإسلامي: الإجماع، المصلحة المرسلة',
        'القيم في القرآن الكريم',
        'الوقف في الإسلام',
        'من أحكام الأسرة في الإسلام: مدخل إلى علم الميراث',
        'الربا وأحكامه',
        'من المعاملات المالية الجائزة: بيع الصرف، بيع المرابحة، بيع التقسيط',
        'الحرية الشخصية ومدى ارتباطها بحرية الآخرين',
        'من أحكام الأسرة في الإسلام: النسب، الكفالة',
        'العلاقات الاجتماعية بين المسلمين وغيرهم',
        'خطبة الرسول ﷺ في حجة الوداع'
      ]
    },
    {
      name: 'الفلسفة',
      units: []
    },
    {
      name: 'التاريخ والجغرافيا',
      units: [
        'بروز الصراع و تشكل العالم',
        'مساعي الإنفراج الدولي',
        'من الثنائية إلى الأحادية القطبية',
        'العمل المسلح و رد فعل الإستعمار',
        'استعادة السيادة الوطنية و رد فعل الإستعمار',
        'العالم الثالث بين تراجع الإستعمار التقليدي و استمرار حركات التحرر',
        'فلسطين و من تصفية الإستعمار التقليدي و استمرارية التحرر',
        'اشكالية التقدم و التخلف',
        'المبادلات و التنقلات في العالم',
        'مصادر القوة الأمريكية و تأثيرها على الإقتصاد العالمي',
        'ظاهرة التكتل و أثرها في قوة الإتحاد الأوروبي',
        'العلاقة بين السكان و التنمية في شرق و جنوب شرق اسيا',
        'الإقتصاد الجزائري في العالم',
        'التنمية في البرازيل'
      ]
    },
    {
      name: 'اللغة العربية وآدابها',
      units: [
        'أحكام الحال والتمييز',
        'إعراب الجمل',
        'إذا، إذ، حينئذ، إذن',
        'دلالات إذا وإعرابها',
        'دلالات إذ وإعرابها',
        'حينئذ، وقتئذ، يومئذ...',
        'إعراب إذًا، إذن',
        'دلالات وإعراب لو، لولا، لوما',
        'ثوابت إعرابية',
        'إعراب الضمائر المتصلة والمنفصلة',
        'النواسخ والحروف المشبهة بالفعل',
        'أنماط النصوص',
        'الاتساق والانسجام',
        'العلاقات المعنوية',
        'الحقول الدلالية',
        'نثر الشعر',
        'تلخيص النصوص',
        'القيم، العواطف، النزعات',
        'الصور البيانية: التشبيه، الاستعارة، الكناية',
        'المجاز العقلي والمرسل',
        'الأساليب: الإنشائية والخبرية',
        'المحسنات البديعية: اللفظية والمعنوية',
        'كيف أجيب على سؤال البناء الفكري',
        'بعض أسئلة البناء الفكري المتكررة',
        'شخصية الأديب',
        'الأجناس الأدبية - الأنواع الأدبية',
        'الظواهر النقدية',
        'الهيكلة الفكرية للنص - الفكرة العامة والأفكار الأساسية',
        'محور عصر الضعف',
        'محور الرومانسية (الشعر المهجري)',
        'محور الرمز في الشعر العربي المعاصر',
        'محور الحزن في الشعر العربي المعاصر',
        'محور المقال',
        'محور شعر التفعيلة',
        'محور الالتزام',
        'محور الثورة الجزائرية',
        'كيف أتعامل مع نصوص عصر الضعف؟',
        'كيف أتعامل مع نصوص عصر النهضة؟'
      ]
    },
    {
      name: 'اللغة الفرنسية',
      units: [
        'Le texte historique (النص التاريخي)',
        'Le débat d\'idées (النص الحجاجي)',
        'L\'appel (نداء)',
        'La nouvelle fantastique / La relation de voyage',
        'Compréhension de l\'écrit',
        'Expression écrite',
        'Les types de textes'
      ]
    },
    {
      name: 'اللغة الإنجليزية',
      units: [
        'Ancient Civilizations (الحضارات القديمة)',
        'Ethics in Business (الأخلاق في العمل)',
        'Education in the World (التعليم في العالم)',
        'Safety First (السلامة والصحة والأغذية)',
        'Astronomy and Solar System (علم الفلك والنظام الشمسي)',
        'Reading comprehension',
        'Grammar & vocabulary',
        'Written expression'
      ]
    }
  ];

  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0].name);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('bac_tracker');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const toggleCheckbox = (subject: string, unit: string, type: string) => {
    const key = `${subject}_${unit}_${type}`;
    const updated = { ...progress, [key]: !progress[key] };
    setProgress(updated);
    localStorage.setItem('bac_tracker', JSON.stringify(updated));
  };

  const getSubjectIcon = (name: string) => {
    switch (name) {
      case 'علوم الطبيعة والحياة': return <Dna className="w-5 h-5" />;
      case 'العلوم الفيزيائية': return <Atom className="w-5 h-5" />;
      case 'الرياضيات': return <Calculator className="w-5 h-5" />;
      case 'العلوم الإسلامية': return <BookOpenCheck className="w-5 h-5" />;
      case 'الفلسفة': return <Brain className="w-5 h-5" />;
      case 'التاريخ والجغرافيا': return <Compass className="w-5 h-5" />;
      case 'اللغة العربية وآدابها': return <BookOpen className="w-5 h-5" />;
      case 'اللغة الفرنسية': return <Languages className="w-5 h-5" />;
      case 'اللغة الإنجليزية': return <Languages className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  const currentSubjectObj = subjects.find(s => s.name === selectedSubject) || subjects[0];

  const calculateCompletionPercentage = (subj: typeof subjects[0]) => {
    const total = subj.units.length * 4;
    if (total === 0) return 0;
    let completed = 0;
    subj.units.forEach(unit => {
      ['understand', 'review', 'apps', 'exercises'].forEach(type => {
        if (progress[`${subj.name}_${unit}_${type}`]) {
          completed++;
        }
      });
    });
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-8">
      {/* اختيار المادة */}
      <div className="space-y-4">
        <label className="block text-base md:text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
          اختر المادة أولاً للبدء في تتبع مراجعتك:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {subjects.map(subj => {
            const isSelected = selectedSubject === subj.name;
            const percentage = calculateCompletionPercentage(subj);
            return (
              <button
                key={subj.name}
                onClick={() => setSelectedSubject(subj.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 text-center gap-3 outline-none ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-102'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {getSubjectIcon(subj.name)}
                </div>
                <span className="font-bold text-sm leading-tight">{subj.name}</span>
                {/* Progress bar miniature inside button */}
                <div className="w-full mt-1">
                  <div className="flex justify-between items-center text-[10px] font-bold mb-1 opacity-80">
                    <span>نسبة الإنجاز</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isSelected ? 'bg-white' : 'bg-blue-500'}`} 
                      style={{ width: `${percentage}%` }} 
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* عرض الوحدات للمادة المختارة */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSubject}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="space-y-4 bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                  {getSubjectIcon(currentSubjectObj.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    وحدات مادة {currentSubjectObj.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">حدد المهام المكتملة لتتبع تقدمك اليومي.</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[140px]">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">الإنجاز الكلي</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {calculateCompletionPercentage(currentSubjectObj)}%
                </span>
              </div>
            </div>

            {currentSubjectObj.units.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Brain className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700 animate-pulse" />
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">لا يتوفر محتوى حاليا</p>
                <p className="text-sm opacity-80 mt-1 text-slate-500 dark:text-slate-400">يتم العمل على تجهيز وإضافة الوحدات الخاصة بهذه المادة قريباً.</p>
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-right border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 w-2/5">الوحدة</th>
                      <th className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 text-center">الفهم</th>
                      <th className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 text-center">المراجعة</th>
                      <th className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 text-center">حل التطبيقات</th>
                      <th className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300 text-center">حل التمارين</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentSubjectObj.units.map(unit => (
                      <tr key={unit} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200 text-base">{unit}</td>
                        {['understand', 'review', 'apps', 'exercises'].map(type => {
                          const isDone = progress[`${currentSubjectObj.name}_${unit}_${type}`];
                          return (
                            <td key={type} className="py-4 px-4 text-center">
                              <button 
                                onClick={() => toggleCheckbox(currentSubjectObj.name, unit, type)} 
                                className="focus:outline-none transition-transform active:scale-90"
                              >
                                {isDone ? 
                                  <CheckSquare className="w-6 h-6 text-emerald-500 mx-auto cursor-pointer" /> : 
                                  <Square className="w-6 h-6 text-slate-300 dark:text-slate-700 hover:text-blue-400 dark:hover:text-blue-500 mx-auto cursor-pointer" />
                                }
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// 2b. PlannerExamsTracker
function PlannerExamsTracker() {
  const subjects = [
    'الرياضيات',
    'العلوم الفيزيائية',
    'علوم الطبيعة والحياة',
    'الأدب العربي',
    'اللغة الإنجليزية',
    'اللغة الفرنسية',
    'التاريخ والجغرافيا',
    'العلوم الإسلامية',
    'الفلسفة'
  ];

  const years = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2026 - i);

  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('bac_exams_tracker');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const toggleCheckbox = (subject: string, year: number, topic: number) => {
    const key = `${subject}_${year}_${topic}`;
    const updated = { ...progress, [key]: !progress[key] };
    setProgress(updated);
    localStorage.setItem('bac_exams_tracker', JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {subjects.map(subject => (
        <div key={subject} className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-800 text-white text-center py-3 font-bold text-lg">
            {subject}
          </div>
          <div className="p-4 space-y-1 h-[400px] overflow-y-auto custom-scrollbar">
            {years.map(year => (
              <div key={year} className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-slate-800 last:border-0 hover:bg-white dark:hover:bg-slate-800 px-2 rounded-lg transition-colors">
                <span className="font-bold text-slate-700 dark:text-slate-300">باك {year}</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleCheckbox(subject, year, 1)} 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all outline-none ${
                      progress[`${subject}_${year}_1`] 
                        ? 'bg-blue-500 border-blue-500 scale-110 shadow-sm shadow-blue-500/30' 
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                    title="الموضوع الأول"
                  />
                  <button 
                    onClick={() => toggleCheckbox(subject, year, 2)} 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all outline-none ${
                      progress[`${subject}_${year}_2`] 
                        ? 'bg-blue-500 border-blue-500 scale-110 shadow-sm shadow-blue-500/30' 
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                    title="الموضوع الثاني"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. PlannerPlanning
function PlannerPlanning() {
  const months = ['سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر', 'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان'];
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedWeek, setSelectedWeek] = useState('الأسبوع 1');
  
  const [plan, setPlan] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('bac_planning');
    if (saved) setPlan(JSON.parse(saved));
  }, []);

  const handleChange = (key: string, value: string) => {
    const updated = { ...plan, [key]: value };
    setPlan(updated);
    localStorage.setItem('bac_planning', JSON.stringify(updated));
  };

  const currentMonthPlanKey = `month_${selectedMonth}`;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {months.map(m => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m)}
            className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedMonth === m
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">خطة المعالجة ونقائص الشهر</h3>
          <textarea
            value={plan[`${currentMonthPlanKey}_review`] || ''}
            onChange={e => handleChange(`${currentMonthPlanKey}_review`, e.target.value)}
            placeholder="اكتب نقائص هذا الشهر وكيف ستعالجها..."
            className="w-full h-48 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-100 resize-none"
          />
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
            {['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'].map(w => (
               <button
                 key={w}
                 onClick={() => setSelectedWeek(w)}
                 className={`px-4 py-2 font-bold transition-all ${
                   selectedWeek === w
                     ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                     : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                 }`}
               >
                 {w}
               </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['المواد العلمية', 'اللغات', 'مواد الحفظ'].map(cat => {
              const weekKey = `${currentMonthPlanKey}_${selectedWeek}_${cat}`;
              return (
                <div key={cat} className="space-y-2">
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded text-center">{cat}</h4>
                  <textarea
                    value={plan[weekKey] || ''}
                    onChange={e => handleChange(weekKey, e.target.value)}
                    placeholder={`مهام ${cat}...`}
                    className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-800 dark:text-slate-100 resize-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. PlannerInfo
function PlannerInfo() {
  const [purchases, setPurchases] = useState<{id: number, name: string, price: string, done: boolean}[]>([
    { id: 1, name: 'كتب حوليات البكالوريا', price: '', done: false },
    { id: 2, name: 'أقلام وأدوات مدرسية', price: '', done: false },
    { id: 3, name: 'كراسات للملخصات', price: '', done: false },
  ]);

  const [adminData, setAdminData] = useState({ reg: '', pin: '', center: '' });
  const [examTasks, setExamTasks] = useState({ idCopy: false, convocation: false, tools: false });

  useEffect(() => {
    const p = localStorage.getItem('bac_purchases');
    if (p) setPurchases(JSON.parse(p));
    const a = localStorage.getItem('bac_admin');
    if (a) setAdminData(JSON.parse(a));
    const t = localStorage.getItem('bac_examtasks');
    if (t) setExamTasks(JSON.parse(t));
  }, []);

  const savePurchases = (newP: any) => { setPurchases(newP); localStorage.setItem('bac_purchases', JSON.stringify(newP)); };
  const saveAdmin = (newA: any) => { setAdminData(newA); localStorage.setItem('bac_admin', JSON.stringify(newA)); };
  const saveTasks = (newT: any) => { setExamTasks(newT); localStorage.setItem('bac_examtasks', JSON.stringify(newT)); };

  const updatePurchase = (id: number, field: string, value: any) => {
    savePurchases(purchases.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const addPurchase = () => {
    savePurchases([...purchases, { id: Date.now(), name: '', price: '', done: false }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* قائمة المشتريات الدراسية */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">قائمة المشتريات الدراسية</h3>
        <div className="space-y-2">
          {purchases.map(p => (
            <div key={p.id} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <button onClick={() => updatePurchase(p.id, 'done', !p.done)} className="outline-none">
                {p.done ? <CheckSquare className="w-6 h-6 text-emerald-500" /> : <Square className="w-6 h-6 text-slate-300 dark:text-slate-600" />}
              </button>
              <input 
                type="text" 
                value={p.name} 
                onChange={e => updatePurchase(p.id, 'name', e.target.value)} 
                placeholder="اسم السلعة" 
                className={`flex-1 bg-transparent border-none focus:outline-none font-medium text-slate-800 dark:text-slate-100 ${p.done ? 'line-through opacity-50' : ''}`}
              />
              <input 
                type="text" 
                value={p.price} 
                onChange={e => updatePurchase(p.id, 'price', e.target.value)} 
                placeholder="السعر" 
                className={`w-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 focus:outline-none text-center font-bold text-slate-800 dark:text-slate-100 ${p.done ? 'opacity-50' : ''}`}
              />
            </div>
          ))}
          <button onClick={addPurchase} className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-bold">
            + إضافة مشتريات
          </button>
        </div>
      </div>

      {/* معلومات إدارية هامة ويوم الامتحان */}
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 space-y-4">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400">معلومات إدارية (هامة)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">رقم التسجيل</label>
              <input type="text" value={adminData.reg} onChange={e => saveAdmin({...adminData, reg: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">الرقم السري</label>
              <input type="text" value={adminData.pin} onChange={e => saveAdmin({...adminData, pin: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">مركز الإجراء</label>
              <input type="text" value={adminData.center} onChange={e => saveAdmin({...adminData, center: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800 dark:text-slate-100" />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50 space-y-4">
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400">تجهيزات يوم الامتحان</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={examTasks.idCopy} onChange={e => saveTasks({...examTasks, idCopy: e.target.checked})} className="w-5 h-5 accent-amber-600" />
              <span className="font-semibold text-amber-900 dark:text-amber-200">نسخة من بطاقة الهوية البيومترية</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={examTasks.convocation} onChange={e => saveTasks({...examTasks, convocation: e.target.checked})} className="w-5 h-5 accent-amber-600" />
              <span className="font-semibold text-amber-900 dark:text-amber-200">نسخة من استدعاء البكالوريا</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={examTasks.tools} onChange={e => saveTasks({...examTasks, tools: e.target.checked})} className="w-5 h-5 accent-amber-600" />
              <span className="font-semibold text-amber-900 dark:text-amber-200">أدوات كاملة (أقلام، آلة حاسبة، الخ)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
