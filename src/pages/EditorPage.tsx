import { useState, useEffect } from 'react';
import { Puck } from '@measured/puck';
import { config } from '../config/puck.config';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPageData } from '../store/slices/pageSlice';
import { logout } from '../store/slices/authSlice';
import { PageView } from '../components/PageView';
// import { useLoacalStorage } from '../hooks/useLocalStorage';
import { pagesAPI } from '../services/api';
import { Button, message } from 'antd';
import { LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import type { Data } from '@measured/puck';

export function EditorPage() {
  const dispatch = useAppDispatch();
  const pageData = useAppSelector((state) => state.page.data);
  const user = useAppSelector((state) => state.auth.user);
  const [isEditMode, setIsEditMode] = useState(true);
  // const [localData, setLocalData] = useLoacalStorage<Data>('puck-page-data', pageData);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user's page from backend on mount
  useEffect(() => {
    const loadUserPage = async () => {
      try {
        const response = await pagesAPI.getPage();
        if (response.page?.data) {
          dispatch(setPageData(response.page.data));

          console.log('Loaded the page from backend')
        } else {
          // when there is no backend data , this is a new user or first time
          // start with empty page
          const emptyPage: Data = {
            content: [],
            root: { props: { title: '' } },
          };
          dispatch(setPageData(emptyPage));

          console.log('No backend data, new fresh page.');
        }
      } catch (error) {
        console.error('Failed to load page:', error);
        message.error('Failed to load your page from server.');

        const emptyPage: Data = {
          content: [],
          root: { props: { title: '' } },
        };
        dispatch(setPageData(emptyPage));
      }
      finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserPage();
    }

  }, [user?.id]); // so that it re-runs when we change the user

  const handlePublish = async (data: Data) => {
    dispatch(setPageData(data));
    setIsEditMode(false);

    // Save to backend
    try {
      await pagesAPI.savePage(data);
      message.success('Page published and saved!');
    } catch (error) {
      message.error('Failed to save to server, but saved locally');
      console.error('Save error:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await pagesAPI.savePage(pageData);
      message.success('Page saved successfully!');
    } catch (error) {
      message.error('Failed to save page');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {

    const emptyPage: Data = {
      content: [],
      root: { props: { title: '' } },
    };

    dispatch(setPageData(emptyPage));
    dispatch(logout());
    message.info('Logged out successfully');
  };


  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading your page...</h2>
        </div>
      </div>
    )
  }


  return (
    <div style={{ height: '100vh' }}>
      {isEditMode ? (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '12px 20px',
            background: '#fff',
            borderBottom: '1px solid #e8e8e8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>
                Page Editor
              </h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                Welcome, {user?.username}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={saving}
              >
                Save
              </Button>
              <Button
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                danger
              >
                Logout
              </Button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Puck
              config={config}
              data={pageData}
              onPublish={handlePublish}
            />
          </div>
        </div>
      ) : (
        <PageView
          data={pageData}
          onEdit={() => setIsEditMode(true)}
        />
      )}
    </div>
  );
}