#[tauri::command]
fn calculate_date(full_year: bool, separator: String, reverse_order: bool, leading_zeros: bool) -> String {
    use chrono::{Datelike, Local};

    let now: chrono::DateTime<Local> = Local::now();

    let year: String = if full_year { 
        now.year().to_string() 
    } else { 
        (now.year() % 100).to_string() 
    };

    let ordinal_day: String = if leading_zeros { 
        format!("{:03}", now.ordinal()) 
    } else { 
        now.ordinal().to_string() 
    };

    if reverse_order { 
        format!("{}{}{}", year, separator, ordinal_day) 
    } else { 
        format!("{}{}{}", ordinal_day, separator, year) 
    }
}

#[tauri::command]
fn revert_julian_date(year: u16, julian_day: u16) -> Result<String, String> {
    use chrono::NaiveDate;

    let chrono_year: i32 = year as i32;
    let chrono_julian_day: u32 = julian_day as u32;

    let data: NaiveDate = NaiveDate::from_yo_opt(chrono_year, chrono_julian_day)
        .ok_or("Data juliana inválida")?;
    
    Ok(data.format("%d/%m/%Y").to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_date, revert_julian_date])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    use chrono::{Datelike, Local};

    #[test]
    fn should_calculate_correctly() {
        let now: chrono::DateTime<Local> = Local::now(); 
        let year: String = now.year().to_string();
        let year_short: String = format!("{:02}", now.year() % 100);
        let ordinal_day: String = now.ordinal().to_string();
        let ordinal_day_leading_zeros: String = format!("{:03}", now.ordinal());
        
        let result: String = calculate_date(true, "/".to_string(), false, false);
        assert!(result.starts_with(&ordinal_day));
        assert!(result.contains("/"));
        assert!(result.ends_with(&year));

        let result_reverted: String = calculate_date(false, "-".to_string(), true, true);
        assert!(result_reverted.starts_with(&year_short));
        assert!(result_reverted.contains("-"));
        assert!(result_reverted.ends_with(&ordinal_day_leading_zeros));

        let result_without_separator: String = calculate_date(true, "".to_string(), false, false);
        assert_eq!(result_without_separator, format!("{}{}", ordinal_day, year));
    }

    #[test]
    fn should_revert_julian_date_correctly_when_date_is_valid() {
        let result: Result<String, String> = revert_julian_date(2023, 100);
        assert_eq!(result, Ok("10/04/2023".to_string()));

        let result2: Result<String, String> = revert_julian_date(2024, 60);
        assert_eq!(result2, Ok("29/02/2024".to_string()));
        
        let result3: Result<String, String> = revert_julian_date(2025, 60);
        assert_eq!(result3, Ok("01/03/2025".to_string()));

        let result4: Result<String, String> = revert_julian_date(2026, 123);
        assert_eq!(result4, Ok("03/05/2026".to_string()));

        let result5: Result<String, String> = revert_julian_date(2027, 365);
        assert_eq!(result5, Ok("31/12/2027".to_string()));

        let result6: Result<String, String> = revert_julian_date(2028, 366);
        assert_eq!(result6, Ok("31/12/2028".to_string()));
        
        let result7: Result<String, String> = revert_julian_date(2027, 1);
        assert_eq!(result7, Ok("01/01/2027".to_string()));

        let result8: Result<String, String> = revert_julian_date(2028, 1);
        assert_eq!(result8, Ok("01/01/2028".to_string()));
    }

    #[test]
    fn should_return_error_when_julian_date_is_invalid() {
        let default_error_message: String = "Data juliana inválida".to_string();

        let result: Result<String, String> = revert_julian_date(2023,366); // 2023 is not a leap year, so it has only 365 days
        assert_eq!(result.unwrap_err(), default_error_message);

        let result2: Result<String, String> = revert_julian_date(2024, 367); // 2024 is a leap year, so it has only 366 days
        assert_eq!(result2.unwrap_err(), default_error_message);

        let result3: Result<String, String> = revert_julian_date(2025, 0); // Julian day starts from 1, so 0 is invalid
        assert_eq!(result3.unwrap_err(), default_error_message);
    }
}