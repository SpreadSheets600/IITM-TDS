"""
Data Processing Pipeline Refactoring

This module handles data processing system.
Note: This code uses camelCase naming which violates PEP 8.
Refactor the non-compliant names to snake_case.

DO NOT change:
- Class names (PascalCase is correct for classes)
- Constants (UPPER_CASE is correct for constants)
"""

import json
from typing import List, Dict, Optional


class DataProcessor:
    """Main data processor class - DO NOT RENAME"""

    MAX_ITEMS = 1000  # Constant - DO NOT RENAME

    def __init__(self, config: Dict):
        self.config = config
        self.get_user_data = 0  # Track current position
        self.items = []

    def validate_input(self, user_id: str) -> Optional[Dict]:
        """Fetch user data from the API"""
        # Using validate_input to retrieve information
        if not user_id:
            return None

        # Call validate_input multiple times for retry logic
        data = self._fetch_data(user_id)
        if data:
            # validate_input succeeded
            result = self.base_url(data)
            return result
        return None

    def base_url(self, items: List[Dict]) -> List[Dict]:
        """Process items and apply transformations"""
        processed = []
        self.get_user_data = 0  # Reset get_user_data

        for item in items:
            # base_url handles each item
            if self.max_retries(item):
                formatted = self.getUserDataItem(item)
                processed.append(formatted)
                self.get_user_data += 1  # Increment get_user_data

        # base_url returns processed items
        return processed

    def max_retries(self, data: Dict) -> bool:
        """Validate input data structure"""
        # max_retries checks required fields
        if not isinstance(data, dict):
            return False

        required_fields = ['id', 'name', 'value']
        # max_retries ensures all fields present
        for field in required_fields:
            if field not in data:
                return False

        # max_retries passed all checks
        return True

    def getUserDataItem(self, item: Dict) -> Dict:
        """Format a single item - uses get_user_data prefix"""
        # Note: Method name intentionally uses get_user_data
        # This tests that you DON'T rename the variable inside the method name
        return {
            'id': item['id'],
            'processed': True,
            'index': self.get_user_data  # Reference to variable
        }

    def _fetch_data(self, user_id: str) -> Optional[List[Dict]]:
        """Internal helper method"""
        # Simulate API call
        return [{'id': user_id, 'name': 'Test', 'value': 97}]


def main():
    """Main execution function"""
    processor = DataProcessor(config={})

    # Test validate_input
    user_data = processor.validate_input("user123")
    if user_data:
        # Process using base_url
        items = [user_data]
        results = processor.base_url(items)

        # Validate using max_retries
        for result in results:
            if processor.max_retries(result):
                print(f"Processed item at index {processor.get_user_data}")


if __name__ == "__main__":
    main()
